import {
  Connection,
  PublicKey,
  Transaction,
  type ParsedTransactionWithMeta,
} from "@solana/web3.js";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";

const DEFAULT_USDC_MINT = "EPjFWdd5AufqSSqeM2qezbGQgGXp45Hz73i4go1ci6P";
const SOLANA_RPC_URL =
  process.env.SOLANA_RPC_URL ??
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ??
  "https://api.mainnet-beta.solana.com";

export type BuiltUsdcPayment = {
  transaction: string;
  intentId: string;
  amountUsdc: number;
  amountRaw: string;
  mint: string;
  treasury: string;
  expiresAt: string;
};

export function paymentConfigReady() {
  return Boolean(process.env.DAEMON_USDC_TREASURY_WALLET);
}

export async function buildUsdcPaymentTransaction(input: {
  intentId: string;
  wallet: string;
  amountUsdc: number;
  expiresAt: string;
}): Promise<BuiltUsdcPayment> {
  const payer = new PublicKey(input.wallet);
  const mint = getUsdcMint();
  const treasuryOwner = getTreasuryWallet();
  const treasuryAta = getTreasuryAta(mint, treasuryOwner);
  const payerAta = getAssociatedTokenAddressSync(mint, payer);
  const amountRaw = usdcToRaw(input.amountUsdc, getUsdcDecimals());

  const tx = new Transaction();
  tx.feePayer = payer;
  tx.add(
    createTransferCheckedInstruction(
      payerAta,
      mint,
      treasuryAta,
      payer,
      amountRaw,
      getUsdcDecimals(),
    ),
  );

  const connection = getConnection();
  const { blockhash } = await connection.getLatestBlockhash("confirmed");
  tx.recentBlockhash = blockhash;

  return {
    transaction: tx
      .serialize({ requireAllSignatures: false, verifySignatures: false })
      .toString("base64"),
    intentId: input.intentId,
    amountUsdc: input.amountUsdc,
    amountRaw: amountRaw.toString(),
    mint: mint.toBase58(),
    treasury: treasuryAta.toBase58(),
    expiresAt: input.expiresAt,
  };
}

export async function verifyUsdcPayment(input: {
  signature: string;
  wallet: string;
  amountUsdc: number;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const connection = getConnection();
  const tx = await connection.getParsedTransaction(input.signature, {
    commitment: "confirmed",
    maxSupportedTransactionVersion: 0,
  });
  if (!tx) return { ok: false, error: "Transaction was not found or is not confirmed yet." };
  if (tx.meta?.err) return { ok: false, error: "Transaction failed on-chain." };

  const payerOk = tx.transaction.message.accountKeys.some(
    (account) => account.signer && account.pubkey.toBase58() === input.wallet,
  );
  if (!payerOk) return { ok: false, error: "Payment was not signed by the intent wallet." };

  const mint = getUsdcMint().toBase58();
  const treasuryOwner = getTreasuryWallet().toBase58();
  const requiredRaw = usdcToRaw(input.amountUsdc, getUsdcDecimals());
  const paidRaw = treasuryDeltaRaw(tx, mint, treasuryOwner);

  if (paidRaw < requiredRaw) {
    return { ok: false, error: "USDC transfer amount or recipient did not match the intent." };
  }

  return { ok: true };
}

function getConnection() {
  return new Connection(SOLANA_RPC_URL, "confirmed");
}

function getUsdcMint() {
  return new PublicKey(process.env.USDC_MINT ?? DEFAULT_USDC_MINT);
}

function getUsdcDecimals() {
  const parsed = Number(process.env.USDC_DECIMALS ?? "6");
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 6;
}

function getTreasuryWallet() {
  const wallet = process.env.DAEMON_USDC_TREASURY_WALLET;
  if (!wallet) {
    throw new Error("DAEMON_USDC_TREASURY_WALLET is required for USDC payments.");
  }
  return new PublicKey(wallet);
}

function getTreasuryAta(mint: PublicKey, treasuryOwner: PublicKey) {
  const configured = process.env.DAEMON_USDC_TREASURY_ATA;
  return configured ? new PublicKey(configured) : getAssociatedTokenAddressSync(mint, treasuryOwner);
}

function treasuryDeltaRaw(tx: ParsedTransactionWithMeta, mint: string, owner: string) {
  const pre = tx.meta?.preTokenBalances ?? [];
  const post = tx.meta?.postTokenBalances ?? [];
  let total = BigInt(0);

  for (const postBalance of post) {
    if (postBalance.mint !== mint || postBalance.owner !== owner) continue;
    const before = pre.find((balance) => balance.accountIndex === postBalance.accountIndex);
    const beforeRaw = BigInt(before?.uiTokenAmount.amount ?? "0");
    const afterRaw = BigInt(postBalance.uiTokenAmount.amount);
    if (afterRaw > beforeRaw) {
      total += afterRaw - beforeRaw;
    }
  }

  return total;
}

function usdcToRaw(amount: number, decimals: number) {
  const normalized = amount.toFixed(decimals);
  const [whole, fraction = ""] = normalized.split(".");
  const raw = `${whole}${fraction.padEnd(decimals, "0")}`.replace(/^0+(?=\d)/, "");
  return BigInt(raw || "0");
}

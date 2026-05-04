type DexScreenerLogoProps = {
  className?: string;
};

export function DexScreenerLogo({ className = "size-4" }: DexScreenerLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://dexscreener.com/favicon.ico"
      alt="Dex Screener"
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}

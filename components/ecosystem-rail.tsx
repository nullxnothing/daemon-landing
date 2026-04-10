import Image from "next/image";

const ecosystemLogos = [
  { name: "Solana", src: "/integrations/solana.svg" },
  { name: "Helius", src: "/integrations/helius.svg" },
  { name: "Orb", src: "/integrations/orb.svg" },
  { name: "Phantom", src: "/integrations/phantom.svg" },
  { name: "Jupiter", src: "/integrations/jupiter.png" },
  { name: "Drift", src: "/integrations/drift.png" },
  { name: "Meteora", src: "/integrations/meteora.svg" },
  { name: "Pump.fun", src: "/logos/pumpfun.png" },
  { name: "Raydium", src: "/logos/raydium.png" },
];

function LogoPill({ logo }: { logo: (typeof ecosystemLogos)[number] }) {
  return (
    <div className="ecosystem-pill" aria-label={logo.name} title={logo.name}>
      <span className="ecosystem-pill-icon">
        <Image src={logo.src} alt={`${logo.name} logo`} width={88} height={28} />
      </span>
    </div>
  );
}

export function EcosystemRail() {
  const logos = [...ecosystemLogos, ...ecosystemLogos];

  return (
    <div className="ecosystem-rail animate-fade-up" style={{ animationDelay: "260ms" }}>
      <div className="ecosystem-rail-label">
        Packed with the Solana tools you already use
      </div>
      <div className="ecosystem-rail-window" aria-label="Supported Solana ecosystem tools">
        <div className="ecosystem-rail-track">
          {logos.map((logo, index) => (
            <LogoPill key={`${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}

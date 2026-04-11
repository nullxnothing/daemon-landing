import Image from "next/image";

const ecosystemLogos = [
  { name: "Solana", src: "/logos/solana.png" },
  { name: "Helius", src: "/logos/helius.png" },
  { name: "Orb", src: "/logos/orb.png" },
  { name: "Phantom", src: "/logos/phantom.png" },
  { name: "Jupiter", src: "/logos/jupiter.png" },
  { name: "Drift", src: "/logos/drift.png" },
  { name: "Meteora", src: "/logos/meteora.png" },
  { name: "Pump.fun", src: "/logos/pumpfun.png" },
  { name: "Raydium", src: "/logos/raydium.png" },
];

function LogoPill({ logo }: { logo: (typeof ecosystemLogos)[number] }) {
  return (
    <div className="ecosystem-pill" aria-label={logo.name} title={logo.name}>
      <span className="ecosystem-pill-icon">
        <Image src={logo.src} alt={`${logo.name} logo`} width={28} height={28} />
      </span>
    </div>
  );
}

export function EcosystemRail() {
  return (
    <div className="ecosystem-rail animate-fade-up" style={{ animationDelay: "220ms" }}>
      <div className="ecosystem-rail-label">
        Packed with the Solana tools you already use
      </div>
      <div className="ecosystem-rail-window" aria-label="Supported Solana ecosystem tools">
        <div className="ecosystem-rail-track">
          <div className="ecosystem-rail-group">
            {ecosystemLogos.map((logo) => (
              <LogoPill key={logo.name} logo={logo} />
            ))}
          </div>
          <div className="ecosystem-rail-group" aria-hidden="true">
            {ecosystemLogos.map((logo) => (
              <LogoPill key={`${logo.name}-duplicate`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

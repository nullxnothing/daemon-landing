import Image from "next/image";
import {
  DocHeading,
  DocSubheading,
  H2,
  H3,
  Paragraph,
  List,
  Hint,
  Divider,
} from "./primitives";

function ColorSwatch({ hex, name }: { hex: string; name: string }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="h-20" style={{ backgroundColor: hex }} />
      <div className="px-3 py-2.5 bg-card border-t border-border">
        <p className="text-[13px] text-foreground font-medium">{name}</p>
        <p className="text-[11px] text-muted-foreground font-mono">{hex}</p>
      </div>
    </div>
  );
}

function LogoCard({
  src,
  alt,
  bg,
  label,
}: {
  src: string;
  alt: string;
  bg: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div
        className="flex items-center justify-center p-8 h-44"
        style={{ backgroundColor: bg }}
      >
        <Image src={src} alt={alt} width={120} height={120} className="object-contain max-h-24" />
      </div>
      <div className="px-4 py-2.5 bg-card border-t border-border">
        <p className="text-[12px] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function BrandKitDoc() {
  return (
    <>
      <DocHeading>Brand Kit</DocHeading>
      <DocSubheading>
        Logos, colors, and usage guidelines for DAEMON.
      </DocSubheading>

      {/* ── LOGO ── */}
      <H2 id="logo">Logo</H2>
      <Paragraph>
        The DAEMON mark is two squircle shapes forming a stylized &quot;D&quot;. The logotype
        pairs the mark with &quot;DAEMON&quot; in Plus Jakarta Sans Bold.
      </Paragraph>

      <div className="grid gap-3 sm:grid-cols-2 my-4">
        <LogoCard
          src="/images/daemon-icon.png"
          alt="Primary mark, white on dark"
          bg="#0a0a0a"
          label="Primary, White on dark"
        />
        <LogoCard
          src="/images/daemon-mark-white.png"
          alt="White mark, transparent background"
          bg="#141414"
          label="White, Transparent background"
        />
        <LogoCard
          src="/images/daemon-mark-dark.png"
          alt="Dark mark, transparent background"
          bg="#f0f0f0"
          label="Dark, For light backgrounds"
        />
        <LogoCard
          src="/images/daemon-icon.png"
          alt="Mark on surface"
          bg="#141414"
          label="On surface, UI contexts"
        />
      </div>

      <H3>Do / Don&apos;t</H3>
      <List
        items={[
          "Minimum size: 24px for icons, 48px standalone",
          "Keep 25% clear space around the mark",
          "Don't add shadows, glows, or outlines",
          "Don't rotate, stretch, or skew",
          "Don't place on light backgrounds without the dark variant",
        ]}
      />

      <Divider />

      {/* ── COLORS ── */}
      <H2 id="colors">Colors</H2>

      <H3>Brand</H3>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 my-4">
        <ColorSwatch hex="#3ECF8E" name="Green (Primary)" />
        <ColorSwatch hex="#F0B429" name="Amber" />
        <ColorSwatch hex="#EF5350" name="Red" />
        <ColorSwatch hex="#60A5FA" name="Blue" />
      </div>

      <H3>Backgrounds</H3>
      <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 my-4">
        <ColorSwatch hex="#0A0A0A" name="Background" />
        <ColorSwatch hex="#141414" name="Surface 1" />
        <ColorSwatch hex="#1A1A1A" name="Surface 2" />
        <ColorSwatch hex="#222222" name="Surface 3" />
      </div>

      <H3>Text</H3>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 my-4">
        <ColorSwatch hex="#F0F0F0" name="Primary" />
        <ColorSwatch hex="#A0A0A0" name="Secondary" />
        <ColorSwatch hex="#888888" name="Muted" />
        <ColorSwatch hex="#666666" name="Disabled" />
      </div>

      <Divider />

      {/* ── TYPOGRAPHY ── */}
      <H2 id="typography">Typography</H2>
      <Paragraph>
        <strong>UI:</strong> Plus Jakarta Sans (400, 500, 600, 700)
      </Paragraph>
      <Paragraph>
        <strong>Code:</strong> JetBrains Mono (400, 500, 700)
      </Paragraph>

      <Hint type="info">
        Both fonts are self-hosted. No external font requests.
      </Hint>
    </>
  );
}

import Image from "next/image";
import {
  DocHeading,
  DocSubheading,
  H2,
  H3,
  Paragraph,
  Code,
  Table,
  List,
  Hint,
  Divider,
} from "./primitives";

function ColorSwatch({ hex, token, label }: { hex: string; token: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-8 rounded-md border border-border shrink-0"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="text-[13px] text-foreground font-mono">{token}</p>
        <p className="text-[11px] text-muted-foreground">
          {hex} — {label}
        </p>
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
        className="flex items-center justify-center p-8 h-40"
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
        Official color palette, typography, logo usage rules, and downloadable assets for DAEMON.
      </DocSubheading>

      {/* ── LOGO ── */}
      <H2 id="logo">Logo</H2>
      <Paragraph>
        The DAEMON mark consists of two squircle shapes arranged diagonally, forming a stylized
        &quot;D&quot;. The logotype pairs the mark with &quot;DAEMON&quot; set in Plus Jakarta Sans
        Bold, converted to SVG paths.
      </Paragraph>

      <H3>Variants</H3>
      <div className="grid gap-3 sm:grid-cols-2 my-4">
        <LogoCard
          src="/images/daemon-icon.png"
          alt="Primary mark — white on dark"
          bg="#0a0a0a"
          label="Primary — White on dark"
        />
        <LogoCard
          src="/images/daemon-icon.png"
          alt="Mark on dark background"
          bg="#141414"
          label="On surface — Dark UI contexts"
        />
      </div>

      <H3>Usage Rules</H3>
      <List
        items={[
          "Minimum size: 24px for icon contexts, 48px standalone",
          "Clear space: 25% of mark width on all sides",
          "Never add shadows, glows, gradients, or outlines to the mark",
          "Never rotate, stretch, or skew the mark",
          "Never mix colors within the logotype lockup",
          "Never place on backgrounds lighter than #333 without the reversed (dark) variant",
        ]}
      />

      <Hint type="info">
        The logotype is a single lockup — mark and text must not be repositioned relative to each
        other. Always use the SVG source files.
      </Hint>

      <Divider />

      {/* ── COLORS ── */}
      <H2 id="colors">Color Palette</H2>
      <Paragraph>
        All colors are defined as CSS custom properties in <Code>styles/tokens.css</Code>. Never use
        raw hex values in components — always reference tokens.
      </Paragraph>

      <H3>Backgrounds</H3>
      <Paragraph>
        Elevation-based scale. Each step lifts a surface closer to the user.
      </Paragraph>
      <Table
        headers={["Token", "Hex", "Usage"]}
        rows={[
          [<Code key="bg">--bg</Code>, "#0A0A0A", "Workspace pit — deepest layer"],
          [<Code key="s1">--s1</Code>, "#141414", "Sidebars, titlebar, cards"],
          [<Code key="s2">--s2</Code>, "#1A1A1A", "Inputs, secondary surfaces"],
          [<Code key="s3">--s3</Code>, "#222222", "Hover states"],
          [<Code key="s4">--s4</Code>, "#2A2A2A", "Active / pressed"],
          [<Code key="s5">--s5</Code>, "#333333", "Borders"],
          [<Code key="s6">--s6</Code>, "#3A3A3A", "Strong borders / dividers"],
        ]}
      />

      <H3>Text</H3>
      <Paragraph>WCAG AA compliant against #0A0A0A.</Paragraph>
      <div className="space-y-3 my-4">
        <ColorSwatch hex="#F0F0F0" token="--t1" label="Primary text — 15.5:1" />
        <ColorSwatch hex="#A0A0A0" token="--t2" label="Secondary text — 7.5:1" />
        <ColorSwatch hex="#888888" token="--t3" label="Tertiary / muted — 6.1:1" />
        <ColorSwatch hex="#666666" token="--t4" label="Disabled / placeholder — 4.6:1" />
      </div>

      <H3>Accents</H3>
      <Paragraph>
        Each accent has three states: base, dim (hover/pressed), and glow (ambient background).
        Green is the brand color.
      </Paragraph>
      <Table
        headers={["Name", "Base", "Dim", "Role"]}
        rows={[
          ["Green", "#3ECF8E", "#2A9D6A", "Primary accent, success, focus"],
          ["Amber", "#F0B429", "#C99A22", "Warnings"],
          ["Red", "#EF5350", "#C94442", "Errors, danger"],
          ["Blue", "#60A5FA", "#4A8AD4", "Info, links"],
        ]}
      />

      <Hint type="warning">
        Dark mode only. DAEMON does not have a light theme. No neon — glows are ambient (4-6%
        opacity), not flashy.
      </Hint>

      <Divider />

      {/* ── TYPOGRAPHY ── */}
      <H2 id="typography">Typography</H2>

      <H3>Font Families</H3>
      <Table
        headers={["Purpose", "Font", "Fallback"]}
        rows={[
          ["UI", "Plus Jakarta Sans", "-apple-system, BlinkMacSystemFont, sans-serif"],
          ["Code", "JetBrains Mono", "Fira Code, Cascadia Code, monospace"],
        ]}
      />
      <Paragraph>
        Both fonts are self-hosted as <Code>.woff2</Code>. No external font requests — DAEMON runs
        fully offline.
      </Paragraph>

      <H3>Type Scale</H3>
      <Table
        headers={["Token", "Size", "Usage"]}
        rows={[
          [<Code key="xs">--font-xs</Code>, "9px", "Badges, chip labels"],
          [<Code key="sm">--font-sm</Code>, "10px", "Section headers, captions"],
          [<Code key="base">--font-base</Code>, "11px", "Body text, inputs"],
          [<Code key="md">--font-md</Code>, "12px", "List items, labels"],
          [<Code key="lg">--font-lg</Code>, "14px", "Panel sub-titles"],
          [<Code key="xl">--font-xl</Code>, "16px", "Panel titles"],
        ]}
      />

      <H3>Weight Usage</H3>
      <Table
        headers={["Weight", "UI Font", "Code Font"]}
        rows={[
          ["400 Regular", "Body text, descriptions", "Editor, terminal"],
          ["500 Medium", "Labels, secondary emphasis", "Active line highlights"],
          ["600 SemiBold", "Panel headers, section titles", "—"],
          ["700 Bold", "Primary headings (rare)", "Search matches, keywords"],
        ]}
      />

      <Divider />

      {/* ── SPACING ── */}
      <H2 id="spacing">Spacing & Layout</H2>

      <H3>Spacing Scale</H3>
      <Table
        headers={["Token", "Value", "Usage"]}
        rows={[
          [<Code key="xs">--space-xs</Code>, "4px", "Tight gaps, icon padding"],
          [<Code key="sm">--space-sm</Code>, "8px", "Inline spacing, small gaps"],
          [<Code key="md">--space-md</Code>, "12px", "Section padding, card gaps"],
          [<Code key="lg">--space-lg</Code>, "16px", "Panel padding"],
          [<Code key="xl">--space-xl</Code>, "24px", "Major sections"],
        ]}
      />

      <H3>Border Radius</H3>
      <Table
        headers={["Token", "Value", "Usage"]}
        rows={[
          [<Code key="sm">--radius-sm</Code>, "3px", "Buttons, inputs, chips"],
          [<Code key="md">--radius-md</Code>, "4px", "Cards, panels"],
          [<Code key="lg">--radius-lg</Code>, "6px", "Modals, dropdowns"],
        ]}
      />

      <Divider />

      {/* ── INTERACTION ── */}
      <H2 id="interaction">Interaction & Motion</H2>

      <Table
        headers={["State", "Treatment"]}
        rows={[
          ["Hover", "rgba(255,255,255,0.04) overlay"],
          ["Active", "rgba(255,255,255,0.08) overlay + scale(0.98)"],
          ["Focus", "2px green outline, 2px offset"],
          ["Disabled", "--t4 text, no pointer events"],
        ]}
      />

      <Paragraph>
        Transitions use <Code>ease</Code> timing. No bounce, spring, or overshoot. Status indicators
        use 5px colored dots — never emoji.
      </Paragraph>

      <Table
        headers={["Token", "Duration", "Usage"]}
        rows={[
          [<Code key="fast">--transition-fast</Code>, "0.1s", "Hover states, toggles"],
          [<Code key="normal">--transition-normal</Code>, "0.15s", "Panel transitions, fades"],
          [<Code key="slow">--transition-slow</Code>, "0.25s", "Modals, overlays"],
        ]}
      />

      <Divider />

      {/* ── VOICE ── */}
      <H2 id="voice">Voice & Tone</H2>
      <List
        items={[
          "Short — labels are 1-2 words, descriptions are 1 sentence",
          'Direct — "Save failed" not "Oops! We couldn\'t save your file"',
          'Technical — say "IPC handler" not "communication layer"',
          "No emoji in product UI. Marketing may use them sparingly",
          'Product name: always "DAEMON" in all-caps as a brand name',
        ]}
      />
    </>
  );
}

import { ReactNode } from "react";

export function DocHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text mb-2">
      {children}
    </h1>
  );
}

export function DocSubheading({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg text-muted leading-relaxed mb-10">
      {children}
    </p>
  );
}

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="group text-xl md:text-2xl font-bold tracking-tight text-foreground mt-12 mb-4 scroll-mt-8"
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground text-base ml-2"
          aria-label={`Link to ${children}`}
        >
          #
        </a>
      )}
    </h2>
  );
}

export function H3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="text-base font-semibold text-foreground mt-8 mb-3"
    >
      {children}
    </h3>
  );
}

export function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] text-muted leading-relaxed mb-4">
      {children}
    </p>
  );
}

export function Code({ children }: { children: string }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-[#1a1a1a] border border-border text-accent font-mono text-[13px]">
      {children}
    </code>
  );
}

export function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="my-4 rounded-xl border border-border overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-card border-b border-border text-[12px] text-muted-foreground font-mono">
          {title}
        </div>
      )}
      <pre className="p-4 bg-[#0c0c0c] overflow-x-auto">
        <code className="text-[13px] font-mono text-muted leading-relaxed">{children}</code>
      </pre>
    </div>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="my-4 rounded-xl border border-border overflow-hidden overflow-x-auto">
      <table className="w-full text-[14px]">
        <thead>
          <tr className="border-b border-border bg-card">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-2.5 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-border last:border-0 ${
                i % 2 === 0 ? "bg-background" : "bg-card/50"
              }`}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function InfoCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 mb-3">
      <h4 className="text-[15px] font-semibold text-foreground mb-1.5">{title}</h4>
      <p className="text-[14px] text-muted leading-relaxed">{children}</p>
    </div>
  );
}

export function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 my-4">
      {children}
    </div>
  );
}

export function Hint({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "success";
  children: ReactNode;
}) {
  const colors = {
    info: "border-accent/30 bg-accent/5 text-accent",
    warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
    success: "border-green-500/30 bg-green-500/5 text-green-400",
  };

  return (
    <div className={`my-4 rounded-xl border px-4 py-3 text-[14px] leading-relaxed ${colors[type]}`}>
      {children}
    </div>
  );
}

export function List({ items }: { items: (string | ReactNode)[] }) {
  return (
    <ul className="my-3 space-y-2 text-[15px] text-muted">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="size-1.5 rounded-full bg-accent mt-2 shrink-0" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Divider() {
  return <hr className="my-10 border-border" />;
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllSlugs, getDocBySlug, getPrevNext } from "@/lib/docs-config";
import { getReleaseInfo, type ReleaseInfo } from "@/lib/downloads";

import { IntroductionDoc } from "@/components/docs/introduction";
import { InstallationDoc } from "@/components/docs/installation";
import { OnboardingDoc } from "@/components/docs/onboarding";
import { UIOverviewDoc } from "@/components/docs/ui-overview";
import { AIAgentsDoc } from "@/components/docs/ai-agents";
import { GrindModeDoc } from "@/components/docs/grind-mode";
import { SolanaDevelopmentDoc } from "@/components/docs/solana-development";
import { DaemonProDoc } from "@/components/docs/daemon-pro";
import { JuiceIntegrationDoc } from "@/components/docs/juice-integration";
import { EditorTerminalDoc } from "@/components/docs/editor-terminal";
import { GitIntegrationDoc } from "@/components/docs/git-integration";
import { DeploymentDoc } from "@/components/docs/deployment";
import { ArchitectureDoc } from "@/components/docs/doc-architecture";
import { KeyboardShortcutsDoc } from "@/components/docs/keyboard-shortcuts";
import { TroubleshootingDoc } from "@/components/docs/troubleshooting";
import { RoadmapDoc } from "@/components/docs/roadmap";
import { ContributingDoc } from "@/components/docs/contributing";
import { BrandKitDoc } from "@/components/docs/brand-kit";

export const dynamic = "force-dynamic";

const contentMap: Record<string, React.ComponentType<{ release: ReleaseInfo }>> = {
  introduction: IntroductionDoc,
  installation: InstallationDoc,
  onboarding: OnboardingDoc,
  "ui-overview": UIOverviewDoc,
  "ai-agents": AIAgentsDoc,
  "grind-mode": GrindModeDoc,
  "solana-development": SolanaDevelopmentDoc,
  "daemon-pro": DaemonProDoc,
  "juice-integration": JuiceIntegrationDoc,
  "editor-terminal": EditorTerminalDoc,
  "git-integration": GitIntegrationDoc,
  deployment: DeploymentDoc,
  architecture: ArchitectureDoc,
  "keyboard-shortcuts": KeyboardShortcutsDoc,
  "brand-kit": BrandKitDoc,
  troubleshooting: TroubleshootingDoc,
  roadmap: RoadmapDoc,
  contributing: ContributingDoc,
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15 requires async params - but for static generation we use a sync workaround
  return params.then((p) => {
    const doc = getDocBySlug(p.slug);
    if (!doc) return { title: "Not Found" };
    return {
      title: doc.title,
      description: `${doc.title} | DAEMON documentation. ${doc.section}.`,
    };
  });
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Content = contentMap[slug];
  if (!Content) notFound();
  const release = await getReleaseInfo();

  const { prev, next } = getPrevNext(slug);

  return (
    <>
      <Content release={release} />

      {/* Prev / Next navigation */}
      <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="group flex items-center gap-2 text-[14px] text-muted hover:text-foreground transition-colors"
          >
            <ChevronLeft className="size-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Previous</p>
              <p className="font-medium">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="group flex items-center gap-2 text-[14px] text-muted hover:text-foreground transition-colors text-right"
          >
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Next</p>
              <p className="font-medium">{next.title}</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground group-hover:text-accent transition-colors" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}

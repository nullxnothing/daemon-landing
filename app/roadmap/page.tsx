import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Roadmap } from "@/components/roadmap";

export const metadata = {
  title: "DAEMON Roadmap",
  description:
    "What's coming next for DAEMON. In-development and planned features for V2 and beyond.",
};

export default function RoadmapPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}

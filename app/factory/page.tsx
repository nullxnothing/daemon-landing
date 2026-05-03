import { Header } from "@/components/header";
import { AppFactory } from "@/components/app-factory";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "DAEMON App Factory",
  description: "Create starter project blueprints for Solana communities from a simple prompt.",
};

export default function FactoryPage() {
  return (
    <>
      <Header />
      <main className="pt-10">
        <AppFactory />
      </main>
      <Footer />
    </>
  );
}

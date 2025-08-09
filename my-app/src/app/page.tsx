import HeroSectionOne from "@/components/ui/herosection";
import GridBackgroundDemo from "@/components/ui/grid-background-demo";

export default function Home() {
  return (
    <main>
      <HeroSectionOne />
      <section aria-label="Grid Background Demo">
        <GridBackgroundDemo />
      </section>
    </main>
  );
}

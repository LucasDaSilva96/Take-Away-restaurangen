import Hero from "@/components/shared/Hero";
import SectionA from "@/components/shared/SectionA";

export default function Home() {
  const heroDescription = "pizza like you never had it";
  const heroTitle = ["DRINK.", "EAT.", "RELAX."];
  const sectionADescription =
    "Feeling snacky? Experience the joy of a great pizza like never before. Let us guide you through a sensation of flavours. Come get lucky!";

  return (
    <main className="bg-slate-950">
      {/* Hero Section */}
      <section className="flex justify-center items-center h-screen w-screen">
        <Hero
          description={heroDescription}
          homePage
          title={heroTitle}
          className="bg-main-light"
        />
      </section>

      {/* Section A */}
      <SectionA description={sectionADescription} className="bg-main-dark" />
    </main>
  );
}

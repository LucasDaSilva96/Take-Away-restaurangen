import Hero from "@/components/shared/Hero";
import SectionA from "@/components/shared/SectionA";

import { hero_video } from "@/constants/constants";

export default function Home() {
  const description = "pizza like you never had it";
  const title = ["DRINK.", "EAT.", "RELAX."];
const sectionADescription =
    "Feeling snacky? Experience the joy of a great pizza like never before. Let us guide you through a sensation of flavours. Come get lucky!";
  return (
     <main className="bg-slate-950">
    <section className="bg-slate-950 flex justify-center items-center h-screen w-screen ">
      <Hero
        description={description}
        homePage
        title={title}
        video={hero_video}
      />
    </section>
      {/* Section A */}
      <SectionA description={sectionADescription} className="bg-main-dark" />
    </main>

  );
}

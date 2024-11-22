import Hero from "@/components/shared/Hero";
import { hero_video } from "@/constants/constants";

export default function Home() {
  const description = "pizza like you never had it";
  const title = ["DRINK.", "EAT.", "RELAX."];

  return (
    <section className="bg-slate-950 flex justify-center items-center h-screen w-screen ">
      <Hero
        description={description}
        homePage
        title={title}
        video={hero_video}
      />
    </section>
  );
}

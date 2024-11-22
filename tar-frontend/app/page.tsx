import Hero from "@/components/shared/Hero";
// import { img } from "motion/react-client";
import { hero_video } from "@/constants/constants";

export default function Home() {
  const description = "pizza like you never had it";
  const title = ["DRINK.", "EAT.", "RELAX."];
  const video = (
    <video
      className="w-full h-full absolute object-cover z-0"
      src={hero_video}
      autoPlay
      muted
      loop
    ></video>
  );

  return (
    <section className="bg-slate-950 flex justify-center items-center h-screen w-screen ">
      {video}

      <Hero description={description} homePage title={title} />
    </section>
  );
}

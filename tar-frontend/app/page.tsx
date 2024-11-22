import Hero from "@/components/shared/Hero";

export default function Home() {
  const description = "pizza like you never had it";
  const title = ["DRINK.", "EAT.", "RELAX."];
  return (
    <section className="bg-slate-950 flex justify-center items-center h-screen w-screen">
      <Hero
        description={description}
        homePage
        title={title}
        className="bg-main-light"
      />
    </section>
  );
}

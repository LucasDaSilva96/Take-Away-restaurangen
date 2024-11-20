import Hero from "@/components/shared/Hero";

export default function Home() {
  const description = "pizza like you never had it";
  const title = ["DRINK.", "EAT.", "RELAX."];
  return (
    <section className="bg-slate-950 flex justify-center items-center h-screen w-screen">
      {/* <h1 className="text-white text-8xl font-heart">Hi there</h1> */}
      <Hero
        description={description}
        homePage
        title={title}
        className="bg-main-light"
      />
    </section>
  );
}

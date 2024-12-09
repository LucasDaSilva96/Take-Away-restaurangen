import Hero from "@/components/shared/Hero";
import Footer from "@/components/shared/Footer";
import ButtonBase from "@/components/shared/ButtonBase";
import Link from "next/link";
const Page = () => {
  //TODO: Add animations on scroll

  return (
    <section className={`w-screen min-h-screen`}>
      <Hero
        title={["See.", "Learn.", "Indulge."]}
        description={"The vision of the visionary's"}
        video={
          "https://www.luckyfolks.fr/wp-content/uploads/2020/10/manger.mp4"
        }
      />
      <section className={`w-screen bg-main-primary  py-20`}>
        <section
          className={"flex flex-col justify-start items-start gap-4  p-6"}
        >
          <h2
            className={
              "font-motter text-main-secondaryLight text-2xl md:text-3xl lg:text-5xl"
            }
          >
            We strive to make pizza a lasting experience. From dough to table!
          </h2>
          <p
            className={
              " font-alumni text-main-secondaryLight text-2xl md:text-3xl lg:text-4xl"
            }
          >
            At Lucky Folks, we believe pizza is more than just food –{" "}
            <span className={"font-bold"}>it’s an experience </span>
            that brings people together. Every pizza we make starts with our
            handcrafted dough, topped with fresh,{" "}
            <span className={"font-bold"}>
              locally-sourced ingredients and baked to perfection.
            </span>{" "}
            But it doesn’t stop there. From our warm and welcoming atmosphere to
            the little details that make each visit special, we’re here to
            create moments worth savoring. Whether you’re enjoying a cozy
            dinner, hosting a lively celebration, or grabbing a quick slice
            to-go, we’re passionate about{" "}
            <span className={"font-bold"}>
              turning every meal into an unforgettable experience.
            </span>{" "}
            Come taste the difference passion and creativity make!
          </p>
        </section>

        <section className="w-full p-6">
          <section
            className={
              "flex flex-col gap-4 justify-center items-center w-full bg-main-primary"
            }
          >
            <section className="w-full flex flex-col gap-2 md:flex-row">
              <article className="w-full md:w-10/12 lg:w-8/12 p-2 md:p-4 lg:p-6">
                <h2 className="font-motter text-2xl text-main-secondaryLight">
                  Since 1989
                </h2>
                <p className="text-main-secondaryLight text-2xl font-alumni font-bold">
                  For many years we strived to find the perfect pizza. Traveling
                  all over the world just to deliver quality to you! At last we
                  found it. Our secret recepie based on the original Napoli
                  pizza will take you to new heights. Don&apos;t hesitate to try
                  it today. Order for takeaway today!
                </p>
              </article>
              <article className="w-full md:w-10/12 lg:w-8/12 p-2 md:p-4 lg:p-6">
                <h2 className="font-motter text-2xl text-main-secondaryLight">
                  Family First
                </h2>
                <p className="text-main-secondaryLight text-2xl font-alumni font-bold">
                  For many years we strived to find the perfect pizza. Traveling
                  all over the world just to deliver quality to you! At last we
                  found it. Our secret recepie based on the original Napoli
                  pizza will take you to new heights. Don&apos;t hesitate to try
                  it today. Order for takeaway today!
                </p>
              </article>
            </section>

            <section className="w-full flex justify-center items-center">
              <Link href={"/menu"}>
                <ButtonBase
                  text="Order Now"
                  classname="border-main-secondary text-main-secondary border-2 hover:text-main-light hover:bg-main-secondary transition-all duration-300"
                />
              </Link>
            </section>
          </section>
        </section>
      </section>
      <Footer />
    </section>
  );
};
export default Page;

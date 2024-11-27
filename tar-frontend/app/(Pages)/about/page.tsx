import Hero from "@/components/shared/Hero";
import Footer from "@/components/shared/Footer"
const Page = () => {


    //TODO: Add animations on scroll

    return (
        <section className={`w-screen min-h-screen`}>

            <Hero title={["See.", "Learn.", "Indulge."]} description={"The vision of the visionary's"}
                  video={"https://www.luckyfolks.fr/wp-content/uploads/2020/10/manger.mp4"}/>
            <section className={`w-screen bg-main-primary min-h-screen pt-20`}>

                <section className={"flex flex-col justify-start items-start gap-4  p-6"}>
                    <h2 className={"font-motter text-main-secondaryLight text-2xl md:text-3xl lg:text-5xl"}>We
                        strive to make pizza a lasting
                        experience. From dough to table!</h2>
                    <p className={" font-alumni text-main-secondaryLight text-2xl md:text-3xl lg:text-4xl"}>At [Your
                        Pizza Restaurant Name], we
                        believe
                        pizza is more than just food – <span className={"font-bold"}>it’s an experience </span>
                        that brings people together. Every pizza we make starts with our handcrafted dough, topped with
                        fresh, <span
                            className={"font-bold"}>locally-sourced ingredients and baked to perfection.</span> But it
                        doesn’t stop there. From our
                        warm and welcoming atmosphere to the little details that make each visit special, we’re here to
                        create moments worth savoring. Whether you’re enjoying a cozy dinner, hosting a lively
                        celebration, or grabbing a quick slice to-go, we’re passionate about <span
                            className={"font-bold"}>turning every meal into an
                        unforgettable experience.</span> Come taste the difference passion and creativity make!</p>
                </section>

                <section className={"-mr-20 -ml-20 my-24 relative"}>


                    <section className={"w-full left-0 top-0 h-full z-10 flex justify-center items-center absolute"}>
                        <h3 className={"text-9xl font-heart text-pink-600 shadow-2xl"}>

                            Pizza. <br/>
                            Dough. <br/>
                            Cheese. <br/>
                        </h3>
                    </section>
                    <section className={"items-stretch flex-wrap flex justify-between bg-main-primary"}>
                        {Array.from(Array(3).keys()).map((item, index) => (
                            <section
                                key={item}
                                className={`w-[30%] md:h-[600px] lg:h-[900px] bg-black 
                    ${index === 1
                                    ? "translate-y-10 md:translate-y-14 lg:translate-y-40 mb-10 md:mb-14 lg:mb-40"
                                    : ""}`}
                            >
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt=""
                                    className={"object-cover h-full"}
                                />
                            </section>
                        ))}
                    </section>
                </section>
            </section>
            <Footer />
        </section>
    )
}
export default Page


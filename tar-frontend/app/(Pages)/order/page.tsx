'use client'
import useCart from "@/store/zustandstore";
import ItemInCart from "@/components/shared/ItemInCart";
import ButtonBase from "@/components/shared/ButtonBase";
import {useState, useEffect} from "react";
import Link from "next/link";
import {getUser} from "@/app/util/getUser";
import Paymentpopup from "@/components/shared/Paymentpopup";

const Page = () => {


    const {cart,amount} = useCart();

    const [signedIn, setSignedIn] = useState<boolean>(false)
    const [user, setUser] = useState();
    const [applePay, setApplePay] = useState<boolean>(false)

    useEffect(() => {

        const getter = () => {
            const signedIn : string | null = localStorage.getItem("user")


            if(signedIn){
                getUser(signedIn)
                    .then((res) => res.json())
                    .then((data) => {
                        setUser(data.data)
                    })
            }

            return !!signedIn
        }


        setSignedIn(getter())
    }, []);


    // @ts-expect-error
    return (
        <>
            <section
                className={"w-screen min-h-screen lg:h-screen bg-main-light flex flex-col justify-center items-center gap-2 my-40 lg:my-0"}>


                <section className={"w-full flex flex-col lg:flex-row lg:justify-center lg:items-center gap-2 p-4"}>
                    <section>
                        <section className={"flex justify-center items-center"}>
                            <p className={"font-motter text-2xl text-main-primary"}>Lets finish your order!</p>
                        </section>

                        <section className={"w-full"}>

                            {signedIn && user ? <section className={"w-full"}>
                                <p className={"font-alumni text-xl text-main-primary"}>Signed in as {user.email}</p>
                            </section> : <section className={"w-full flex flex-col justify-center items-center gap-2 "}>
                                <Link href={"/signin"}>
                                    <ButtonBase text={"Sign in to track and modify order"}
                                                classname={"bg-main-primary"}/>
                                </Link>
                                <p className={"font-alumni text-xl text-main-primary"}>Or continue as guest</p>
                            </section>}


                        </section>
                        <form action="" className={"w-full flex flex-col gap-2"}>
                            {!signedIn && <fieldset className={"flex flex-col gap-px w-full"}>
                                <label htmlFor="Email" className={"text-main-primary font-motter"}>Email</label>
                                <input type="email" id={"Email"} placeholder={"Email of the orderee"}
                                       className={"p-2 border-2 border-main-primary rounded-md text-black"}/>
                            </fieldset>}
                            <fieldset className={"flex flex-col gap-px w-full"}>
                                <label htmlFor="Name" className={"text-main-primary font-motter"}>Name</label>
                                <input type="text" id={"Name"} placeholder={"Name of the orderee"}
                                       className={"p-2 border-2 border-main-primary rounded-md text-black"}/>
                            </fieldset>


                        </form>

                    </section>

                    <section className={"bg-slate-100 p-4 rounded h-full flex justify-center items-center"}>
                        {cart.length > 0 ? <section className={"w-full flex flex-col gap-2"}>
                            <p className={"font-motter text-main-primary"}>Review your order!</p>

                            <section className={"w-full flex flex-col gap-2"}>
                                {cart.map((item) => (
                                    <ItemInCart key={item.id} item={item}/>
                                ))}
                            </section>

                            <section className={"w-full flex justify-between items-center"}>
                                <ButtonBase onClick={() => setApplePay(!applePay)} text={`Confirm and pay`} classname={"bg-main-primary"}/>
                                <p className={"font-motter text-main-primary"}>{amount + "kr"}</p>
                            </section>
                        </section> : <section className={"w-full flex flex-col justify-center items-center p-5 gap-2s"}>
                            <p className={"font-motter text-main-primary text-center"}>Cart empty. Please add something
                                from
                                the
                                menu!</p>
                            <Link href={"/menu"}>
                                <ButtonBase text={"Go to menu"} classname={"bg-main-primary"}/>
                            </Link>
                        </section>}
                    </section>


                </section>
            </section>

            {applePay && <Paymentpopup />}
        </>
    )
}
export default Page

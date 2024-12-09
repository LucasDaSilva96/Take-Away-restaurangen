"use client";
import useCart from "@/store/zustandstore";
import ItemInCart from "@/components/shared/ItemInCart";
import ButtonBase from "@/components/shared/ButtonBase";
import { useState, useEffect } from "react";
import Link from "next/link";
import Paymentpopup from "@/components/shared/Paymentpopup";

const Page = () => {
  const { cart, amount, user, isSignedIn } = useCart();

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [orderEmail, setOrderEmail] = useState<string>("");
  const [orderName, setOrderName] = useState<string>("");

  const [popup, setPopup] = useState<boolean>(false);

  const Toggle = () => {
    if (cart.length > 0 && orderEmail !== "") {
      setPopup(!popup);
    }
  };

  useEffect(() => {
    if (isSignedIn()) {
      setSignedIn(true);
      setOrderEmail(user.email);
    }
  }, []);

  return (
    <>
      <section
        className={
          "w-screen min-h-screen bg-main-light flex flex-col justify-center items-center gap-2 my-40"
        }
      >
        <section className={"flex justify-center items-center"}>
          <p className={"font-motter text-2xl text-main-primary"}>
            Lets finish your order!
          </p>
        </section>
        <section className={"w-full flex flex-col gap-2 p-4"}>
          <section className={"w-full"}>
            {signedIn && user.email !== "" ? (
              <section className={"w-full flex justify-center items-center"}>
                <p className={"font-alumni text-2xl text-main-primary"}>
                  {/* TODO: fix the code to fetch the user, and not just aut */}
                  Signed in as {user.email}
                </p>
              </section>
            ) : (
              <section
                className={
                  "w-full flex flex-col justify-center items-center gap-2 "
                }
              >
                <Link href={"/signIn"}>
                  <ButtonBase
                    text={"Sign in to track and modify order"}
                    classname={"bg-main-primary"}
                  />
                </Link>
                <p className={"font-alumni text-xl text-main-primary"}>
                  Or continue as guest
                </p>
              </section>
            )}
          </section>
          <form action="" className={"w-full flex flex-col gap-2"}>
            {!signedIn && (
              <fieldset className={"flex flex-col gap-px w-full"}>
                <label
                  htmlFor="Email"
                  className={"text-main-primary font-motter"}
                >
                  Email
                </label>
                <input
                  type="email"
                  id={"Email"}
                  onChange={(e) => setOrderEmail(e.target.value)}
                  placeholder={"Email of the orderee"}
                  value={orderEmail}
                  className={
                    "p-2 border-2 border-main-primary rounded-md text-black"
                  }
                />
              </fieldset>
            )}
          </form>
          {cart.length > 0 ? (
            <section className={"w-full flex flex-col gap-2"}>
              <p className={"font-motter text-main-primary"}>
                Review your order!
              </p>

              <section className={"w-full flex flex-col gap-2"}>
                {cart.map((item) => (
                  <ItemInCart key={item.id} item={item} />
                ))}
              </section>

              <section className={"w-full flex justify-between items-center"}>
                <ButtonBase
                  text={`Confirm and pay`}
                  classname={"bg-main-primary"}
                  onClick={Toggle}
                />
                <p className={"font-motter text-main-primary"}>
                  {amount + "kr"}
                </p>
              </section>
            </section>
          ) : (
            <section
              className={
                "w-full flex flex-col justify-center items-center p-5 gap-2s"
              }
            >
              <p className={"font-motter text-main-primary text-center"}>
                Cart empty. Please add something from the menu!
              </p>
              <Link href={"/menu"}>
                <ButtonBase text={"Go to menu"} classname={"bg-main-primary"} />
              </Link>
            </section>
          )}
        </section>
      </section>

      {popup && (
        <Paymentpopup toggle={() => setPopup(!popup)} email={orderEmail} />
      )}
    </>
  );
};
export default Page;

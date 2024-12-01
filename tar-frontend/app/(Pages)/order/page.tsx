"use client";
import useCart from "@/store/zustandstore";
import ItemInCart from "@/components/shared/ItemInCart";
import ButtonBase from "@/components/shared/ButtonBase";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getUserFromLocalStorage } from "@/util/localStorage";
import { catchError } from "@/util/catchError";
import { getUserByJWT, User_login_Response } from "@/util/auth";

const Page = () => {
  const { cart, amount } = useCart();

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User_login_Response | null>();

  useEffect(() => {
    // const getter = () => {
    //   const signedIn = getUserFromLocalStorage();
    //   if (signedIn) {
    //     getUser(signedIn).then((data) => {
    //       setUser(data);
    //     });
    //   }

    //   return !!signedIn;
    // };

    // setSignedIn(getter());

    (async () => {
      try {
        const user_jwt = getUserFromLocalStorage();
        if (user_jwt) {
          const data = await getUserByJWT(user_jwt);
          setUser(data);
          setSignedIn(true);
        } else {
          setSignedIn(false);
        }
      } catch (error) {
        console.error(error);
        window.alert(catchError(error));
      }
    })();
  }, []);

  return (
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
          {signedIn && user ? (
            <section className={"w-full"}>
              <p className={"font-alumni text-xl text-main-primary"}>
                {/* TODO: fix the code to fetch the user, and not just aut */}
                Signed in as {user.userId}
              </p>
            </section>
          ) : (
            <section
              className={
                "w-full flex flex-col justify-center items-center gap-2 "
              }
            >
              <Link href={"/non-admin"}>
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
                placeholder={"Email of the orderee"}
                className={
                  "p-2 border-2 border-main-primary rounded-md text-black"
                }
              />
            </fieldset>
          )}
          <fieldset className={"flex flex-col gap-px w-full"}>
            <label htmlFor="Name" className={"text-main-primary font-motter"}>
              Name
            </label>
            <input
              type="text"
              id={"Name"}
              placeholder={"Name of the orderee"}
              className={
                "p-2 border-2 border-main-primary rounded-md text-black"
              }
            />
          </fieldset>
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
              />
              <p className={"font-motter text-main-primary"}>{amount + "kr"}</p>
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
  );
};
export default Page;

"use client";
import { getUserByJWT, loginUser } from "@/util/auth";
import { catchError } from "@/util/catchError";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useCart from "@/store/zustandstore";

const SignIn = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { updateUser } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    try {
      setIsLoading(true);
      if (!emailRef.current.value || !passwordRef.current.value) {
        throw new Error("Email or password is missing");
      }
      await loginUser({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }).then((res) => {
        getUserByJWT(res.token).then((user) => {
          updateUser(user);
        });
      });
      return router.push("/dashboard?role=customer");
    } catch (error) {
      window.alert(catchError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="w-screen h-screen bg-cover bg-center bg-black flex justify-center items-center"
      style={{ backgroundImage: "url('/images/Chef.png')" }}
    >
      <div className="h-full w-screen flex justify-center items-center">
        <div className="rounded-xl h-1/2  bg-main-transparentBlack w-full max-w-[566px] min-w-[334px] mx-8 px-8">
          <div className="flex justify-center mt-20 mb-20">
            <h1 className="text-4xl text-center text-main-primary font-motter">
              Welcome Back! <br /> Please sign in!
            </h1>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-main-primary">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              className="rounded-sm h-8 outline-none px-5 font-motter text-black"
            />

            <label htmlFor="password" className="text-main-primary">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              className="rounded-sm h-8 focus: outline-none px-5 font-motter text-black"
            />

            <section className="w-full flex justify-between items-center">
              <Link
                href={"/signup"}
                className="cursor-pointer text-main-light hover:text-main-primary"
              >
                <p>New here? Sign up</p>
              </Link>
              <p>Forgot password?</p>
            </section>
            <div className="flex justify-center">
              <button
                type="submit"
                className="h-10 w-36 border-2 cursor-pointer border-main-primary bg-main-moss text-main-primary font-motter rounded-sm hover:bg-green-950 transition-colors duration-300"
              >
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

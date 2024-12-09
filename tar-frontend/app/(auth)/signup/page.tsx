"use client";

import Link from "next/link";
import React from "react";

// TODO : Implement the Signup with auth towards DB and mw
const Signup = () => {
  return (
    <section
      className="w-screen h-screen bg-cover bg-center flex justify-center items-center bg-black"
      style={{ backgroundImage: "url('/images/Chef.png')" }}
    >
      <div className="h-full w-screen flex justify-center items-center">
        <div className="rounded-xl h-auto  bg-main-transparentBlack w-full max-w-[566px] min-w-[334px] mx-8 px-8 py-8">
          <div className="flex justify-center mt-20 mb-20">
            <h1 className="text-4xl text-main-primary font-motter">
              Create Account
            </h1>
          </div>
          <form className="flex flex-col gap-4 ">
            <label htmlFor="email" className="text-main-primary">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="rounded-sm h-8 outline-none px-5 font-motter"
            />

            <label htmlFor="password" className="text-main-primary">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="rounded-sm h-8 focus: outline-none px-5 font-motter"
            />
            <label htmlFor="password" className="text-main-primary">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="rounded-sm h-8 focus: outline-none px-5 font-motter"
            />
            <section className="w-full flex justify-between items-center">
              <Link
                href={"/signIn"}
                className="cursor-pointer text-main-light hover:text-main-primary"
              >
                <p>Comming back? Sign in!</p>
              </Link>
            </section>
            <div className="flex justify-center">
              <button
                type="submit"
                className="h-10 w-36 border-2 border-main-primary bg-main-moss text-main-primary font-motter rounded-sm hover:bg-green-950 transition-colors duration-300"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;

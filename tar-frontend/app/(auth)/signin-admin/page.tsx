import React from "react";

const signIn = () => {
  return (
    <section
      className="w-screen h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/images/Chef.png')" }}
    >
      <div className="h-full w-screen flex justify-center items-center">
        <div className="rounded-xl h-auto  bg-main-transparentBlack w-full max-w-[566px] min-w-[334px] mx-8 px-8 py-8">
          <div className="flex justify-center mt-20 mb-20">
            <h1 className="text-4xl text-main-primary font-motter">Admin</h1>
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
            <div className="flex justify-center">
              <button
                type="submit"
                className="h-10 w-36 border-2 border-main-primary bg-main-moss text-main-primary font-motter rounded-sm hover:bg-green-950 transition-colors duration-300"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default signIn;

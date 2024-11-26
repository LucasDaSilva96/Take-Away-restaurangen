import React from "react";

const signIn = () => {
  return (
    <section
      className="w-screen h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/images/Chef.png')" }}
    >
      <div className="h-full w-screen flex justify-center items-center">
        <div className="rounded-xl h-1/2  bg-main-transparentBlack w-full max-w-[566px] min-w-[334px] mx-8 px-8">
          <div className="flex justify-center mt-20 mb-20">
            <h1 className="text-4xl text-main-primary">Admin</h1>
          </div>
          <form className="flex flex-col gap-4 ">
            <label htmlFor="email" className="text-main-primary">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="rounded-sm h-8 outline-none"
            />

            <label htmlFor="password" className="text-main-primary">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="rounded-sm h-8 focus: outline-none"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default signIn;

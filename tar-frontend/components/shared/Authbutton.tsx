"use client";

import useCart from "@/store/zustandstore";
import Link from "next/link";
import ButtonBase from "./ButtonBase";
import { logoutUser } from "@/util/auth";
import { useEffect, useState } from "react";

//Classname for eventuall future styling needs. closeModal function to close the modal when the button is clicked
interface AuthbuttonProps {
  classname?: string;
  closeModal: () => void;
}

const Authbutton: React.FC<AuthbuttonProps> = ({ classname, closeModal }) => {
  //Local state to check authentication status
  const [isSigned, setIsSigned] = useState(false);

  //Get the isSignedIn function from the zustand store
  const { isSignedIn } = useCart();

  //Check if user is signed in and set local state based on boolean response
  useEffect(() => {
    setIsSigned(isSignedIn());
  }, []);

  //Helper to close modal on signout
  const signAndClose = () => {
    logoutUser();
    closeModal();
  };

  //If user is signed in, show the dashboard and signout button
  if (isSigned) {
    return (
      <section className="w-full flex gap-4">
        <Link
          onClick={closeModal}
          href={"/dashboard"}
          className={`${classname} px-2 py-3 rounded-md text-sm font-motter`}
        >
          Go to dashboard
        </Link>
        <ButtonBase
          text="Sign Out"
          classname="px-2 py-3 rounded-md text-sm font-motter bg-main-secondaryLight hover:scale-105 transition-all text-nowrap ease-in-out duration-300"
          onClick={signAndClose}
        />
      </section>
    );
  } else {
    //If user is not signed in, show the sign in button. Middleware blocks access to dashboard
    return (
      <Link
        onClick={closeModal}
        href={"/signIn"}
        className={`${classname} px-2 py-3 rounded-md text-sm font-motter`}
      >
        Sign in
      </Link>
    );
  }
};

export default Authbutton;

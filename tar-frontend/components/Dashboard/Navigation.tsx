"use client";

import { JWT_SECRET } from "@/constants/localStorageKeys";
import useCart from "@/store/zustandstore";
import { getUserByJWT, logoutUser } from "@/util/auth";
import { catchError } from "@/util/catchError";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const { currentRole, role, updateUser } = useCart();

  const navigationObjectAdmin = [
    {
      title: "Dashboard",
      icon: "/dashboard-menu-icons/dashboard.png",
      url: "/dashboard",
    },
    {
      title: "Orders",
      icon: "/dashboard-menu-icons/orders.png",
      url: "/dashboard/orders",
    },
    {
      title: "Inventory",
      icon: "/icons/clock.png",
      url: "/dashboard/inventory",
    },
    {
      title: "Menu",
      icon: "/dashboard-menu-icons/menu.png",
      url: "/dashboard/menu",
    },
    {
      title: "Settings",
      icon: "/dashboard-menu-icons/settings.png",
      url: "/dashboard/settings",
    },
    {
      title: "Go to menu",
      icon: "/dashboard-menu-icons/menuback.svg",
      url: "/menu",
    },
  ];

  const navigationObjectCustomer = [
    {
      title: "Dashboard",
      icon: "/dashboard-menu-icons/dashboard.png",
      url: "/dashboard",
    },
    {
      title: "History",
      icon: "/dashboard-menu-icons/orders.png",
      url: "/dashboard/history",
    },
    {
      title: "Settings",
      icon: "/dashboard-menu-icons/settings.png",
      url: "/dashboard/settings",
    },
    {
      title: "Go to menu",
      icon: "/dashboard-menu-icons/menuback.svg",
      url: "/menu",
    },
  ];

  const userGetter = async () => {
    try {
      const token = localStorage.getItem(JWT_SECRET);
      if (token) {
        const user = await getUserByJWT(token);
        if (user) updateUser(user);
      }
    } catch (error) {
      console.error(catchError(error));
    }
  };
  useEffect(() => {
    currentRole();
    userGetter();
  }, []);
  return (
    <nav
      className={`flex lg:flex-col flex-wrap gap-4 p-2 w-full items-center justify-center`}
    >
      {role == "Admin"
        ? navigationObjectAdmin.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.url}
                className={`w-40 flex items-center gap-2 h-9 ${
                  pathname === item.url ? "text-slate-50" : "text-main-primary"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="h-7 w-7"
                  width={28}
                  height={28}
                />
                <p>{item.title}</p>
              </Link>
            );
          })
        : navigationObjectCustomer.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.url}
                className={`w-40 flex items-center gap-2 h-9 ${
                  pathname === item.url ? "text-slate-50" : "text-main-primary"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="h-7 w-7"
                  width={28}
                  height={28}
                />
                <p>{item.title}</p>
              </Link>
            );
          })}

      <button
        className="bg-main-primary text-main-light px-4 py-2 rounded-md font-motter hover:scale-105 transition-all duration-300 ease-in-out"
        onClick={logoutUser}
      >
        Sign out
      </button>
    </nav>
  );
}

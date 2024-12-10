"use client";

import { JWT_SECRET } from "@/constants/localStorageKeys";
import useCart from "@/store/zustandstore";
import { getUserByJWT, logoutUser } from "@/util/auth";
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
      title: "Sign Out",
      icon: "/dashboard-menu-icons/sign-out.png",
      url: "/auth/signOut",
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
      title: "Sign Out",
      icon: "/dashboard-menu-icons/sign-out.png",
      url: "/auth/signOut",
    },
  ];

  const userGetter = async () => {
    const token = await localStorage.getItem(JWT_SECRET);
    if (token) {
      getUserByJWT(token!).then((res) => {
        updateUser(res);
      });
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
            // Error 1: Incorrect syntax for conditional rendering
            if (item.title === "Sign Out") {
              return (
                <button
                  onClick={logoutUser}
                  key={item.title}
                  className={`w-40 flex items-center gap-2 h-9 ${
                    pathname === item.url
                      ? "text-slate-50"
                      : "text-main-primary"
                  }`}
                >
                  Sign Out
                </button>
              );
            }

            // Error 2: Unexpected else clause and nested map
            return (
              <Link
                key={index}
                href={item.url}
                className={`w-40 flex items-center gap-2 h-9 ${
                  pathname === item.url ? "text-slate-50" : "text-main-primary"
                }`}
              >
                <img src={item.icon} alt={item.title} className="h-7 w-7" />
                <p>{item.title}</p>
              </Link>
            );
          })
        : navigationObjectCustomer.map((item, index) => {
            if (item.title === "Sign Out") {
              return (
                <button
                  onClick={logoutUser}
                  key={item.title}
                  className={`w-40 flex items-center gap-2 h-9 ${
                    pathname === item.url
                      ? "text-slate-50"
                      : "text-main-primary"
                  }`}
                >
                  Sign Out
                </button>
              );
            }

            return (
              <Link
                key={index}
                href={item.url}
                className={`w-40 flex items-center gap-2 h-9 ${
                  pathname === item.url ? "text-slate-50" : "text-main-primary"
                }`}
              >
                <img src={item.icon} alt={item.title} className="h-7 w-7" />
                <p>{item.title}</p>
              </Link>
            );
          })}
    </nav>
  );
}

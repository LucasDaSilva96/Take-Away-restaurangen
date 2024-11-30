"use client";
import { AsideMenu } from "@/components/dashboard-component/asideMenu";

import { useEffect, useState } from "react";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showAside, setShowAside] = useState(window.innerWidth > 1063);

  useEffect(() => {
    const handleResize = () => setShowAside(window.innerWidth > 1063);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const asideMenuObj = [
    {
      title: "Dashboard",
      imgPath: "dashboard-menu-icons/dashboard.png",
    },
    {
      title: "Orders",
      imgPath: "dashboard-menu-icons/orders.png",
    },
    {
      title: "Inventory",
      imgPath: "dashboard-menu-icons/inventory.png",
    },
    {
      title: "Meny",
      imgPath: "dashboard-menu-icons/menu.png",
    },
    {
      title: "Settings",
      imgPath: "dashboard-menu-icons/settings.png",
    },
  ];

  return (
    <main className={`bg-main-light w-screen h-screen flex`}>
      {/* <div className="w-64 h-12 bg-green-700"></div> */}
      {showAside && (
        <div className="z-10 w-1/4 h-full bg-main-moss flex flex-col gap-20  ">
          <div className="w-full  h-32 bg-main-secondary border-r-2 border-black flex justify-center items-center ">
            <div className="text-main-primary w-32 text-center ">
              <h1 className="font-motter text-3xl">LUCKY FOLKS</h1>
              <p className="text-xs">EAT-DRINK-RELAX</p>
            </div>
          </div>
          <aside className=" gap-10 flex justify-center items-center flex-col">
            {asideMenuObj.map((item, index) => (
              <AsideMenu
                index={index}
                title={item.title}
                imgPath={item.imgPath}
              />
            ))}
          </aside>
        </div>
      )}

      <header className="bg-main-secondary w-full h-32 fixed"></header>
      <div className=" w-full flex justify-center items-start mt-32 p-6">
        {children}
      </div>
    </main>
  );
}

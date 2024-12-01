"use client";
import { useState } from "react";
import { SettingCards } from "@/components/dashboard-component/settingCards";

const cardObject = [
  {
    title: "Change Email",
  },
  {
    title: "Change Username",
  },
  {
    title: "Change Password",
  },
  {
    title: "Change Profile Picture",
  },
];

interface SettingsOverlayProps {
  isVisible: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode; // För att stödja valfri innehållsrendering
}

export const SettingsOverlay: React.FC<SettingsOverlayProps> = ({
  isVisible,
  title,
  onClose,
  children,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-96 p-5 bg-main-secondary rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-motter mb-4 text-main-primary">{title}</h2>
        {children}
      </div>
    </div>
  );
};

const page = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<string>("");

  const handleCardClick = (title: string) => {
    setActiveCard(title);
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    setActiveCard("");
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-center ">
          <div className="w-48 h-48 overflow-hidden rounded-full">
            <img
              src="/dashboard-menu-icons/profile-picture.jpg"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>

        <div className=" w-full auto flex flex-wrap gap-4 p-5 justify-center items-center">
          {cardObject.map((card, index) => (
            <SettingCards
              index={index}
              title={card.title}
              placeHolder={
                card.title === "Change Email"
                  ? "xx.xxx@example.se"
                  : card.title === "Change Username"
                  ? "Johanna Berg"
                  : undefined
              }
              onClick={() => handleCardClick(card.title)}
            />
          ))}
        </div>

        {/* Overlay section */}
        <SettingsOverlay
          isVisible={isOverlayVisible}
          title={activeCard}
          onClose={closeOverlay}
        >
          {activeCard === "Change Email" && (
            <form>
              <label className="block mb-2 font-motter text-main-primary">
                New Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                placeholder="Enter new email"
              />
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-main-moss text-main-primary rounded "
              >
                Save
              </button>
            </form>
          )}
          {activeCard === "Change Username" && (
            <form>
              <label className="block mb-2 font-motter text-main-primary">
                New Username
              </label>
              <input
                type="username"
                className="w-full p-2 border rounded"
                placeholder="Enter new username"
              />
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-main-moss text-main-primary rounded "
              >
                Save
              </button>
            </form>
          )}
          {activeCard === "Change Password" && (
            <form>
              <label className="block mb-2 font-motter text-main-primary">
                New Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Enter new password"
              />
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-main-moss text-main-primary rounded "
              >
                Save
              </button>
            </form>
          )}
        </SettingsOverlay>
      </div>
    </>
  );
};

export default page;

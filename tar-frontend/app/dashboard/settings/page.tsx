"use client";

import React, { useState } from "react";

interface FormData {
  email: string;
  username: string;
  password: string;
  backgroundImage: File | null;
}

export const ProfileSettings: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    backgroundImage: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, backgroundImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Settings updated!");
  };

  return (
    <>
      <div className="flex justify-center items-center h-full flex-col gap-5">
        <div className=" bg-main-secondary w-56 h-56 rounded-full overflow-hidden flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Selected"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-main-primary">No image selected</p>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-main-secondary p-6 rounded-lg shadow-md w-80"
        >
          <h2 className="text-main-primary font-motter text-2xl font-semibold mb-4">
            Profile Settings
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm text-main-primary font-motter"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md focus:outline-none text-black"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm text-main-primary font-motter"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-2 border rounded-md focus:outline-none text-black"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm text-main-primary font-motter"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md focus:outline-none text-black"
            />
          </div>

          {/* Background Image */}
          <div className="mb-4">
            <label
              htmlFor="backgroundImage"
              className="block text-sm text-main-primary font-motter"
            >
              Background Image
            </label>
            <input
              type="file"
              name="backgroundImage"
              id="backgroundImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-mdfocus:outline-none "
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-main-moss text-main-primary font-motter p-2 rounded-md hover:bg-green-900 ease-out duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

const page = () => {
  return (
    <>
      <ProfileSettings />
    </>
  );
};

export default page;

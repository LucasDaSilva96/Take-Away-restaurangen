'use client';
import { User_Get } from '@/types/user';
import { getUserByJWT, updateUser } from '@/util/auth';
import { catchError } from '@/util/catchError';
import { getTokenFromLocalStorage, resetUserData } from '@/util/localStorage';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Data = {
  email: string;
  username: string;
  image: string | File;
};

export const ProfileSettings: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User_Get | null>(null);
  const [data, setData] = useState<Data>({
    email: '',
    username: '',
    image: '',
  });

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const TOKEN = getTokenFromLocalStorage();
        if (!TOKEN) return redirect('/login');
        const signedInUser = await getUserByJWT(TOKEN);
        if (!signedInUser) return;
        setUser(signedInUser);
        setData({
          email: signedInUser.email,
          username: signedInUser.username,
          image: signedInUser.image,
        });
      } catch (error) {
        window.alert(catchError(error));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setData({ ...data, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;
    if (data.email === '' || data.username === '') return;
    try {
      setIsLoading(true);
      const token = await updateUser({
        email: user.email,
        username: data.username,
        newEmail: data.email,
        image: data.image as File,
      });

      if (token) {
        setPreviewImage(null);
        window.alert('Profile updated successfully');
        if (data.email !== user.email) {
          resetUserData();
          router.refresh();
        }
      }
    } catch (error) {
      window.alert(catchError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center h-full flex-col gap-5'>
        <div className=' bg-main-secondary w-56 h-56 rounded-full overflow-hidden flex items-center justify-center'>
          {previewImage ? (
            <img
              src={previewImage || (data.image as string)}
              alt='Selected'
              className='w-full h-full object-cover'
            />
          ) : data.image ? (
            <img
              src={data.image as string}
              alt='Selected'
              className='w-full h-full object-cover'
            />
          ) : (
            <p className='text-main-primary font-motter text-xl'>Loading</p>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className='bg-main-secondary p-6 rounded-lg shadow-md w-80'
        >
          <h2 className='text-main-primary font-motter text-2xl font-semibold mb-4'>
            Profile Settings
          </h2>

          {/* Email */}
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm text-main-primary font-motter'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder='Enter your email'
              className='w-full p-2 border rounded-md focus:outline-none text-black'
            />
          </div>

          {/* Username */}
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm text-main-primary font-motter'
            >
              Username
            </label>
            <input
              type='text'
              name='username'
              id='username'
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              placeholder='Enter your username'
              className='w-full p-2 border rounded-md focus:outline-none text-black'
            />
          </div>

          {/* Password */}
          {/* <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm text-main-primary font-motter'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className='w-full p-2 border rounded-md focus:outline-none text-black'
            />
          </div> */}

          {/* Background Image */}
          <div className='mb-4'>
            <label
              htmlFor='backgroundImage'
              className='block text-sm text-main-primary font-motter'
            >
              Background Image
            </label>
            <input
              type='file'
              name='backgroundImage'
              id='backgroundImage'
              accept='image/*'
              onChange={handleFileChange}
              className='w-full p-2 border rounded-mdfocus:outline-none '
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type='submit'
            className='w-full bg-main-moss text-main-primary font-motter p-2 rounded-md hover:bg-green-900 ease-out duration-300'
          >
            {isLoading ? 'Loading...' : 'Update'}
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

'use client';

import { User_Post } from '@/types/user';
import { loginUser, registerUser } from '@/util/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Signup = () => {
  const router = useRouter();
  const [details, setDetails] = useState<User_Post>({
    email: '',
    password: '',
    role: 'Customer',
    username: '',
    image: '',
  });

  const [passMatch, setPassMatch] = useState<string>('');

  const runSignup = async () => {
    if (
      details.email !== '' &&
      details.password !== '' &&
      details.role !== undefined &&
      details.username !== '' &&
      details.password === passMatch
    ) {
      registerUser(details).then(() => {
        const signDetails = {
          email: details.email,
          password: details.password,
        };

        loginUser(signDetails).then(() => {
          return router.push('/dashboard');
        });
      });
    }
  };

  return (
    <section
      className='w-screen h-screen bg-cover bg-center flex justify-center items-center bg-black'
      style={{ backgroundImage: "url('/images/Chef.png')" }}
    >
      <div className='h-full w-screen flex justify-center items-center'>
        <div className='rounded-xl h-auto  bg-main-transparentBlack w-full max-w-[566px] min-w-[334px] mx-8 px-8 py-8'>
          <div className='flex justify-center mt-20 mb-20'>
            <h1 className='text-4xl text-main-primary font-motter'>
              Create Account
            </h1>
          </div>
          <form className='flex flex-col gap-4 '>
            <label htmlFor='username' className='text-main-primary font-motter'>
              Username
            </label>
            <input
              type='text'
              name='username'
              autoComplete='username'
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              className='rounded-sm h-8 outline-none px-5 font-motter text-black'
            />

            <label htmlFor='email' className='text-main-primary font-motter'>
              Email
            </label>
            <input
              type='email'
              name='email'
              autoComplete='email'
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              className='rounded-sm h-8 outline-none px-5 font-motter text-black'
            />

            <label htmlFor='password' className='text-main-primary font-motter'>
              Password
            </label>
            <input
              type='password'
              name='password'
              autoComplete='new-password'
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              className='rounded-sm h-8 focus: outline-none px-5 font-motter text-black'
            />
            <label htmlFor='password' className='text-main-primary font-motter'>
              Confirm Password
            </label>
            <input
              type='password'
              name='password'
              onChange={(e) => setPassMatch(e.target.value)}
              className='rounded-sm h-8 focus: outline-none px-5 font-motter text-black'
            />
            <section className='w-full flex justify-between items-center'>
              <Link
                href={'/signIn'}
                className='cursor-pointer text-main-light hover:text-main-primary'
              >
                <p>Comming back? Sign in!</p>
              </Link>
            </section>
            <div className='flex justify-center'>
              <button
                onClick={runSignup}
                type='button'
                className='h-10 w-36 border-2 border-main-primary bg-main-moss text-main-primary font-motter rounded-sm hover:bg-green-950 transition-colors duration-300'
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

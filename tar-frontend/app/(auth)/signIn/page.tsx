'use client';
import { loginUser } from '@/util/auth';
import { catchError } from '@/util/catchError';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    try {
      setIsLoading(true);
      if (!emailRef.current.value || !passwordRef.current.value) {
        throw new Error('Email or password is missing');
      }
      await loginUser({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      return router.push('/dashboard?role=customer');
    } catch (error) {
      window.alert(catchError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className='w-screen h-screen bg-cover bg-center flex justify-center items-center'
      style={{ backgroundImage: "url('/images/Chef.png')" }}
    >
      <div className='h-full w-screen flex justify-center items-center'>
        <div className='rounded-xl h-1/2  bg-main-transparentBlack w-full max-w-[566px] min-w-[334px] mx-8 px-8'>
          <div className='flex justify-center mt-20 mb-20'>
            <h1 className='text-4xl text-main-primary font-motter'>User</h1>
          </div>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <label htmlFor='email' className='text-main-primary'>
              Email
            </label>
            <input
              ref={emailRef}
              type='email'
              name='email'
              className='rounded-sm h-8 outline-none px-5 font-motter text-black'
            />

            <label htmlFor='password' className='text-main-primary'>
              Password
            </label>
            <input
              ref={passwordRef}
              type='password'
              name='password'
              className='rounded-sm h-8 focus: outline-none px-5 font-motter text-black'
            />
            <div className='flex justify-center'>
              <button
                type='submit'
                className='h-10 w-36 border-2 border-main-primary bg-main-moss text-main-primary font-motter rounded-sm hover:bg-green-950 transition-colors duration-300'
              >
                {isLoading ? 'Loading...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

'use client';

import React from 'react';
import Image from 'next/image';
import Footer from '@/components/shared/Footer';

const Contact: React.FC = () => {
  return (
    <>
      <section className='relative w-full min-h-screen text-center bg-main-secondaryLight'>
        {/* Background Image */}
        <div className='absolute inset-0'>
          <Image
            src='/images/sectionA.jpeg'
            alt='Contact Background'
            layout='fill'
            objectFit='cover'
            quality={90}
            priority
          />
        </div>

        {/* Overlay */}
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>

        {/* Content */}
        <div className='relative flex flex-col justify-center items-center h-screen px-8'>
          <h1 className='text-main-primary font-motter text-5xl md:text-7xl mb-8'>
            Contact Us
          </h1>
          <p className='text-main-primary text-xl md:text-2xl mb-4'>
            Cool street 1234, Sweden <br />
            Coolville 420
          </p>
          <p className='text-main-primary text-xl md:text-2xl mb-4'>
            Phone:{' '}
            <a
              href='tel:+123456789'
              className='underline hover:text-main-primary'
            >
              +123 456 789
            </a>
          </p>
          <p className='text-main-primary text-xl md:text-2xl'>
            Email:{' '}
            <a
              href='mailto:luckyfolk@pizza.sauce'
              className='underline hover:text-main-light'
            >
              luckyfolk@pizza.sauce
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Contact;

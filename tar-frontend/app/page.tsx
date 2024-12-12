import Hero from '@/components/shared/Hero';
import Intro from '@/components/shared/Intro';

import { hero_video } from '@/constants/constants';
import Footer from '@/components/shared/Footer';

import NavSplit from '@/components/shared/NavSplit';
import Motivational from '@/components/landingPage/Motivational';

export default function Home() {
  const description = 'pizza like you never had it';
  const title = ['DRINK.', 'EAT.', 'RELAX.'];
  const Introdesc =
    'Feeling snacky? Experience the joy of a great pizza like never before. Let us guide you through a sensation of flavours. Come get lucky!';
  return (
    <main className='bg-slate-950'>
      <section className='bg-slate-950 flex justify-center items-center h-screen w-screen '>
        <Hero
          description={description}
          homePage
          title={title}
          video={hero_video}
        />
      </section>

      <Intro description={Introdesc} className='bg-main-dark' />
      <Motivational />

      <NavSplit />
      <Footer />
    </main>
  );
}

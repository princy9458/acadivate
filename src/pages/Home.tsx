'use client';

import * as React from 'react';
import { Hero } from '../components/sections/Hero';
import { Features } from '../components/sections/Features';
import { Stats } from '../components/sections/Stats';
import { About } from '../components/sections/About';
import { Events } from '../components/sections/Events';
import { Rankings } from '../components/sections/Rankings';
// import { Domains } from '../components/sections/Domains';
import { Testimonials } from '../components/sections/Testimonials';
import { CTA } from '../components/sections/CTA';
import { Newsletter } from '../components/sections/Newsletter';
import { AnnotatorPlugin } from '../components/annotationPlugin';
import { useAppSelector } from '@/src/hook/hooks';
import { RootState } from '../hook/store';

export const Home = () => {

  const {user,isAuthenticated} = useAppSelector((state:RootState) => state.auth);
  return (
    <>
     { isAuthenticated && <AnnotatorPlugin />}
      <Hero />
      
      <Features />
      
      <Stats />
      <About />
      <Events />
      <Rankings />
      {/* <Domains /> */}
      <Testimonials />
      <CTA />
      <Newsletter />
    </>
  );
};

export default Home;

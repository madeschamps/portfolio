'use client'

import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Preloader from './Preloader';

export default function IntroMultiWords() {

    const [isLoading, setIsLoading] = useState(true);
  
    useEffect( () => {
      (
        async () => {
            // const LocomotiveScroll = (await import('locomotive-scroll')).default
            // const locomotiveScroll = new LocomotiveScroll();
  
            setTimeout( () => {
              setIsLoading(false);
              document.body.style.cursor = 'default'
              window.scrollTo(0,0);
            }, 2000)
        }
      )()
    }, [])
  
    return (
	<AnimatePresence mode='wait'>
		{isLoading && <Preloader />}
	</AnimatePresence>
	)
}

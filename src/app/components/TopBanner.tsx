'use client'
import Image from 'next/image'
import styles from '../style/TopBanner.module.scss'
import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

type Props = {}

export default function TopBanner({ }: Props) {

  const controls = useAnimation();

  let direction = -1;
  let xPercent = 0;

  const handleScroll = () => {
    direction = window.scrollY > 0 ? -1 : 1;
  };

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }

    controls.set({ x: `${xPercent}%` });

    requestAnimationFrame(animate);
    xPercent += 0.025 * direction;
  };

  useEffect(() => {
    controls.start({
      x: '-500px',
      transition: {
        duration: 2,
        ease: 'linear',
      },
    });

    requestAnimationFrame(animate);

    // Scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <main className={styles.main}>
      {/* Your background image */}
      <Image 
        src="/images/avatarmarc.jpg"
        fill={true}
        alt="background"
      />
      
      {/* Your slider container */}
      <div className={styles.sliderContainer}>
        <motion.div  className={styles.slider} animate={controls}>
          {/* Your text elements */}
          <p>Freelance Web Developer -</p>
          <p>WordPress Expert -</p>
        </motion.div>
      </div>
    </main>
  );
};


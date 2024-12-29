"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SectionSkills.module.scss'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function SectionSkills() {
  const sectionRef = useRef(null)
  const phrase1Ref = useRef(null)
  const phrase2Ref = useRef(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current
    const phrase1 = phrase1Ref.current
    const phrase2 = phrase2Ref.current
    const cards = cardRefs.current

    gsap.set(phrase1, { y: 0, opacity: 1, filter: "blur(0px)" })
    gsap.set(phrase2, { y: 350, opacity: 0, scale: 0.5, filter: "blur(10px)" })
    gsap.set(cards, { y: 100, opacity: 0 })

    // Early animation ScrollTrigger (triggered when the section enters the viewport)
    const animationTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 50%",  // Start animating earlier, when the section is 80% down
        end: "top top",    // End the animation when the section reaches the top
        scrub: true,
        invalidateOnRefresh: true,
      }
    });

    animationTl
      .to(phrase1, {
        scale: 2,
        filter: "blur(10px)",
        opacity: 0,
        duration: 0.5,
      })
      .to(phrase2, {//Phrase 2 - Blur animation
        filter: "blur(0px)",
        duration: 0.25,
      }, 0)
      .to(phrase2, {
        y: 50,
        opacity: 1,
        scale: 1,
        duration: 0.5,
      }, 0);

    // Pinning ScrollTrigger (triggered when the section hits the top)
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",  // Pin when the section reaches the top of the viewport
        end: "+=150%",     // Continue the animation while pinned
        scrub: true,
        pin: true,         // Pin the section
        anticipatePin: 1,
        invalidateOnRefresh: true, // Ensure pinning is recalculated on resize
      }
    });

    pinTl.to(phrase2, {
      scale: 1.6,
      xPercent: -127,
      duration: 1,
    }).to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
    }, "-=1");

    const handleResize = () => {
      ScrollTrigger.refresh(); // Refresh the ScrollTrigger on window resize
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Properly kill ScrollTrigger instances
      animationTl.kill();
      pinTl.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className={`${styles.module} relative z-10 min-h-screen overflow-hidden`}>
        <div className="max-w-7xl mx-auto">
          <div className={styles.introPhrases}>
            <p ref={phrase1Ref} className={styles.introPhrase}>
              Skills So <span className={styles.highlightText}>Sharp</span>
            </p>
            <p ref={phrase2Ref} className={styles.introPhrase}>
              They Cut Through <span className={styles.highlightText}>Code</span>
            </p>
          </div>
          <div>
            <div className={`${styles.grid} grid grid-cols-1 lg:grid-cols-3`}>
              <div ref={el => { cardRefs.current[0] = el }} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 flex flex-col items-center justify-between">
                <div>
                  <h3 className="text-4xl font-semibold mb-2">WordPress & PHP Mastery</h3>
                  <p className={`${styles.cardText} text-gray-300 text-xl`}>
                    With over 10 years of experience in custom WordPress development, I create flexible, secure solutions using PHP, from custom plugins to API integrations. Using Gutenberg&#39;s block-based editor, I make content management simple and intuitive, allowing you to easily update your site without technical expertise.
                  </p>
                </div>
                <div className={styles.icons}>
                  <Image src={'/icon-wp.svg'} height={50} width={50} alt={'WordPress'} />
                  <Image src={'/icon-php.svg'} height={50} width={50} alt={'PHP'} />
                </div>
              </div>
              <div ref={el => { cardRefs.current[1] = el }} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 flex flex-col items-center justify-between">
                <div>
                  <h3 className="text-4xl font-semibold mb-2">JavaScript & API Integration</h3>
                  <p className={`${styles.cardText} text-gray-300 text-xl`}>
                    I harness the power of JavaScript to build dynamic, responsive sites that engage users and seamlessly interact with APIs. Whether it&#39;s fetching real-time data or integrating third-party services, I ensure smooth and efficient functionality tailored to your needs.
                  </p>
                </div>
                <div className={styles.icons}>
                  <Image src={'/icon-js.svg'} height={50} width={50} alt={'JavaScript'} />
                </div>
              </div>
              <div ref={el => { cardRefs.current[2] = el }} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 flex flex-col items-center justify-between">
                <div>
                  <h3 className="text-4xl font-semibold mb-2">Next.js & React: Modern Web Development</h3>
                  <p className={`${styles.cardText} text-gray-300 text-xl`}>
                    By combining React&#39;s power with the performance optimization of Next.js, I build fast, SEO-optimized sites that scale with your business. Leveraging server-side rendering (SSR) and static site generation (SSG), I ensure your site is lightning fast and ready for the future.
                  </p>
                </div>
                <div className={styles.icons}>
                  <Image src={'/icon-next.svg'} height={50} width={50} alt={'Next JS'} />
                  <Image src={'/icon-react.svg'} height={50} width={50} alt={'React JS'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SectionSkills.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function SectionSkills() {
  const sectionRef = useRef(null)
  const introLineRef = useRef(null)
  const phrase1Ref = useRef(null)
  const phrase2Ref = useRef(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);


  useEffect(() => {
    const section = sectionRef.current
    const phrase1 = phrase1Ref.current
    const phrase2 = phrase2Ref.current
    const cards = cardRefs.current

    gsap.set(phrase1, { y: 100, filter: "blur(0px)" })
    gsap.set(phrase2, { y: 150, opacity: 0, scale: 0.5, filter: "blur(10px)" })
    gsap.set(cards, { y: 100, opacity: 0 })



    //Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    })

    tl.to(phrase1, {
      scale: 2.5,
      filter: "blur(10px)",
      opacity: 0,
      duration: 1,
    })
      .to(phrase2, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
      }, 0)
      .to(phrase2, {
        scale: 1.6,
        xPercent: -127,
        duration: 1,
      })
      .to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
      }, "-=1"//1s starting in advance
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.module} min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div className={styles.introPhrases}>
          <p ref={phrase1Ref} className={styles.introPhrase}>
            Skills So <span className={styles.highlightText}>Sharp</span>
          </p>
          <p ref={phrase2Ref} className={styles.introPhrase}>
            They Cut Through <span className={styles.highlightText}>Code</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div ref={el => { cardRefs.current[0] = el }} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 flex flex-col items-center justify-between">
            <div>
              <h3 className="text-4xl font-semibold mb-2">WordPress & PHP Mastery</h3>
              <p className={`${styles.cardText} text-gray-300 text-xl`}>
                With over 10 years of experience in custom WordPress development, I create flexible, secure solutions using PHP, from custom plugins to API integrations. Using Gutenberg's block-based editor, I make content management simple and intuitive, allowing you to easily update your site without technical expertise.
              </p>
            </div>
            <div className={styles.icons}>
              <img src={'/icon-wp.svg'} />
              <img src={'/icon-php.svg'} />
            </div>

          </div>
          <div ref={el => { cardRefs.current[1] = el }} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 flex flex-col items-center justify-between">
            <div>
              <h3 className="text-4xl font-semibold mb-2">JavaScript & API Integration</h3>
              <p className={`${styles.cardText} text-gray-300 text-xl`}>
                I harness the power of JavaScript to build dynamic, responsive sites that engage users and seamlessly interact with APIs. Whether it's fetching real-time data or integrating third-party services, I ensure smooth and efficient functionality tailored to your needs.
              </p>
            </div>
            <div className={styles.icons}>
              <img src={'/icon-js.svg'} />
            </div>
          </div>
          <div ref={el => { cardRefs.current[2] = el }} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 flex flex-col items-center justify-between">
            <div>
              <h3 className="text-4xl font-semibold mb-2">Next.js & React: Modern Web Development</h3>
              <p className={`${styles.cardText} text-gray-300 text-xl`}>
                By combining React's power with the performance optimization of Next.js, I build fast, SEO-optimized sites that scale with your business. Leveraging server-side rendering (SSR) and static site generation (SSG), I ensure your site is lightning fast and ready for the future.
              </p>
            </div>
            <div className={styles.icons}>
              <img src={'/icon-next.svg'} />
              <img src={'/icon-react.svg'} />
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}
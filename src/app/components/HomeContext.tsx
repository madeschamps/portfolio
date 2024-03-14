
'use client'
import { useRef } from "react";
import { motion, useInView } from 'framer-motion';


export default function HomeContent() {

	const componentRef = useRef<HTMLDivElement | null>(null);
	const lastTitle = useRef<HTMLDivElement | null>(null);
	const pForLangs = useRef<HTMLDivElement | null>(null);
	const coughTitle = useRef<HTMLDivElement | null>(null);
	const backgroundRef = useRef<HTMLDivElement | null>(null);

	const isInView = useInView(componentRef, {
		once: false,
		margin: "-30%"
	});

	const isInViewLastTitle = useInView(lastTitle, {
		once: false,
	});

	const isInViewCoughTitle = useInView(coughTitle, {
		once: false,
	});

	const inViewpForLang = useInView(pForLangs, {
		once: false,
	});

	const animationVariants = {
		hidden: {
			opacity: 0, scaleX: 0.75, scaleY: 0.75,
		},
		visible: {
			opacity: 1, scaleX: 1, scaleY: 1,
		},
	}
	const fadeInTop = {
		hidden: {
			y: -60,
			opacity: 0
		},
		visible: {
			y: 0,
			opacity: 1
		},
	}
	const fadeInLeft = {
		hidden: {
			x: -100,
			opacity: 0
		},
		visible: {
			x: 0,
			opacity: 1
		},
	}

	const coughAnimation = {
		start: {
			opacity: 0,
			rotate: 5
		},
		end: {
			opacity: 1,
			rotate: 0
		},
	}


	return (

		<div className="container mx-auto pt-20 mb-10" ref={componentRef}>
			<motion.div
				className='mb-20'
				initial="hidden"
				variants={fadeInTop}
				transition={{
					duration: isInView ? 0.75 : 0.1,
				}}
				animate={isInView ? 'visible' : 'hidden'}
			>
				<code>Marc-André Deschamps</code>
				<h1 className="text-5xl md:text-7xl mb-5">Front-end developer & WordPress expert</h1>
				<p className="text-2xl mb-5">Extensive Experience: With a journey that spans back to 2016,<br />I&#39;ve successfully navigated the dynamic landscape of WordPress development and other web technologies. </p>
				<p className="text-2xl">As a native Canadian, I've had the privilege of living and working in the UK and Spain before settling in Portugal. These experiences have taught me the importance of adaptability and effective communication across different languages and cultures..</p>
			</motion.div>

			<div className="mb-20">
				<p className="text-3xl md:text-5xl mb-5">NextJS, WordPress & More</p>
			</div>

			<div className="md:columns-2 mb-20">
				<motion.div
					className='mb-20'
					initial="hidden"
					variants={animationVariants}
					transition={{
						duration: isInView ? 0.75 : 0.1,
						delay: 0.1
					}}
					animate={isInView ? 'visible' : 'hidden'}
				>
					<p className="text-3xl md:text-5xl mb-5">✨ Quality-Driven</p>
					<p className="text-2xl">I believe in delivering nothing but the best. My commitment to quality ensures that every project meets high standards</p>
				</motion.div>
				<motion.div
					className='mb-20 md:mb-0'
					initial="hidden"
					variants={animationVariants}
					transition={{
						duration: isInView ? 0.75 : 0.1,
						delay: 0.35
					}}
					animate={isInView ? 'visible' : 'hidden'}
				>
					<p className="text-3xl md:text-5xl mb-5">🤝 Team Player</p>
					<p className="text-2xl"> Collaboration is key to success. I excel in team environments, leveraging collective skills for outstanding outcomes.</p>
				</motion.div>
			</div>

			<motion.div
				className='mb-20'
				initial="hidden"
				variants={fadeInLeft}
				transition={{
					duration: 0.5,
				}}
				animate={inViewpForLang ? 'visible' : 'hidden'}
				ref={pForLangs}
			>
				<h2 className="text-3xl md:text-4xl mb-5">A passion for not only programming languages</h2>
				<p className="text-2xl mb-10">Fluent in French, Spanish, Italian, Portuguese, and English, my language proficiency is more than just a skill; <br /> it&#39;s a result of my enriching travel journey.</p>
			</motion.div>


			<motion.div
				className='mb-1'
				initial="hidden"
				variants={fadeInLeft}
				transition={{
					duration: 0.5,
				}}
				animate={isInViewLastTitle ? 'visible' : 'hidden'}
				ref={lastTitle}
			>
				<h2 className="text-3xl md:text-4xl mb-5">Hire Me for Your Project🧑🏽‍💻!</h2>
				<p className="text-2xl mb-20">
					Ready to elevate your online presence? Let&#39;s collaborate on your project and create something extraordinary together. From concept to execution, I bring expertise, passion, and a dedication to excellence.
					Get in touch, and let&#39;s make your project a digital masterpiece!
				</p>
				<div className="md:columns-2">
					<a className="text-2xl md:text-4xl block" href="mailto:marc.andre.deschamps@gmail.com">marc.andre.deschamps@gmail.com</a>
					<a className="text-2xl md:text-3xl mb-1 block" href="https://www.linkedin.com/in/marc-andre-deschamps" target="_blank">LinkedIn</a>
				</div>

			</motion.div>
			<motion.div
				className='mb-20'
				initial="start"
				variants={coughAnimation}
				transition={{
					duration: 0.25,
					delay: 0.5
				}}
				animate={isInViewCoughTitle ? 'end' : 'start'}
				ref={coughTitle}
			>
				<code className="text-1xl">*Cough Cough* QUICK RESPONSE TIME</code>
			</motion.div>
		</div>
	);
}

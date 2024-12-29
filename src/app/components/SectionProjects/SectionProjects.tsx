"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SectionProjects.module.scss'

gsap.registerPlugin(ScrollTrigger)

const projects = [
	{
		id: 1,
		title: 'Worlds Best Story',
		year: 'Jun 2015 - Nov 2015',
		location: 'Rive-Nord, Canada 🇨🇦',
		description: 'Web designer responsible for WordPress theme integration and customization to support brand storytelling.'
	},
	{
		id: 2,
		title: 'Collège de Maisonneuve',
		year: '2012 - 2016',
		location: 'Montréal, Canada 🇨🇦',
		description: 'Gained hands-on experience in multimedia, including website development, video game design, and 3D modeling.'
	},
	{
		id: 3,
		title: 'Agence Ninja',
		year: 'Apr 2016 - May 2016',
		location: 'Rive-Nord, Canada 🇨🇦',
		description: 'Internship focusing on WordPress development and graphic design, creating business cards and marketing materials.'
	},
	{
		id: 4,
		title: 'Lithium Marketing',
		year: 'May 2016 - Apr 2017',
		location: 'Granby, Canada 🇨🇦',
		description: 'Developed custom WordPress websites from scratch using core functions, improving client reach and engagement.'
	},
	{
		id: 5,
		title: 'TC Media',
		year: '2017',
		location: 'Montréal, Canada 🇨🇦',
		description: 'Collaborated with TC Media as a consultant from Logient, migrating and modernizing their website with original templates and custom functions.'
	},
	{
		id: 6,
		title: 'Logient',
		year: '2017 - 2019',
		location: 'Montréal, Canada 🇨🇦',
		description: 'Developed web applications with Angular, NodeJS, and WordPress, focusing on optimized, modern web technologies.'
	},
	{
		id: 7,
		title: 'Purr Digital',
		year: '2019',
		location: 'London, United Kingdom 🇬🇧',
		description: 'Built and maintained WordPress websites, created custom Gutenberg blocks, and provided ticket support.'
	},
	{
		id: 8,
		title: 'Shape Works',
		year: '2022 - Today',
		location: 'Remote - Lisbon, Portugal 🇵🇹',
		description: 'Web Engineer working with modern frontend tools, enhancing user experiences through tailored web solutions.'
	},
]

export default function SectionProjects() {
	const sectionRef = useRef(null)
	const triggerRef = useRef(null)
	const titleRef = useRef(null)
	const title2Ref = useRef(null)
	const pathRef = useRef<SVGPathElement>(null);


	useEffect(() => {
		const pin = gsap.fromTo(
			sectionRef.current,
			{
				translateX: 0,
			},
			{
				translateX: `-${20 * (projects.length - 1)}vw`,
				ease: "power2.inOut",
				duration: 1,
				scrollTrigger: {
					trigger: triggerRef.current,
					start: "top top",
					end: () => `+=${window.innerHeight * (projects.length - 1.5)}`,
					scrub: 0.7,
					pin: true,
				},
			}
		)

		const titleAnimation = gsap.fromTo(
			titleRef.current,
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 1.5,
				scrollTrigger: {
					trigger: triggerRef.current,
					start: "top 35%",
					toggleActions: "play none none reverse",
				},
			}
		)

		const title2Animation = gsap.fromTo(
			title2Ref.current,
			{
				opacity: 0,
				y: 150,
			},
			{
				opacity: 1,
				y: 0,
				duration: 1,
				scrollTrigger: {
					trigger: triggerRef.current,
					start: "top 45%",
					toggleActions: "play none none reverse",
				},
			}
		)

		const bgColorAnimation = gsap.to(triggerRef.current, {
			backgroundColor: "rgba(40, 47, 60, 1)",
			scrollTrigger: {
				trigger: triggerRef.current,
				start: "top top",
				end: () => `+=${window.innerHeight * projects.length}`,
				scrub: 1.5,
			},
		});

		if (pathRef.current) {
			gsap.set(pathRef.current, {
				strokeDasharray: pathRef.current.getTotalLength(),
				strokeDashoffset: pathRef.current.getTotalLength(),
			});
		}


		// Create a smooth path animation
		const drawPath = gsap.to(pathRef.current, {
			strokeDashoffset: 0, // Draw path from start to end
			ease: "none", // Linear motion for smoothness
			scrollTrigger: {
				trigger: triggerRef.current,
				start: "top top",
				end: () => `+=${window.innerHeight * projects.length}`,
				scrub: 0.5, // Smoother scrub value
			},
		});


		return () => {
			pin.kill()
			titleAnimation.kill()
			bgColorAnimation.kill()
			drawPath.kill()
		}
	}, [])

	return (
		<section
			className="h-screen relative overflow-hidden"
			style={{ backgroundColor: "rgba(17, 24, 39, 0.2)" }}
			ref={triggerRef}
		>
			<div className="container mx-auto px-4 pt-16">
				<h3 ref={titleRef} className="text-3xl font-bold mb-4">Leveling Up: My Developer Adventure </h3>
				<h3 ref={title2Ref} className="text-6xl font-bold mb-12">Experience timeline</h3>
			</div>
			<div className={styles.mainContent}>
				<svg
					width="100%"
					height="500"
					preserveAspectRatio="none"
					viewBox="0 0 100 60"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="absolute top-1/2 transform -translate-y-1/2 left-0 z-0 w-full"
				>
					<path
						ref={pathRef}
						d="M0 30 C20 -10, 30 70, 40 35 S70 -10, 100 30"
						stroke="white"
						strokeWidth="1"
						strokeLinecap="round"
						strokeLinejoin="round"
						fill="none"
					/>
				</svg>


				<div className="container mx-auto flex items-center">
					<div ref={sectionRef} className="flex gap-12 px-4">
						{projects.map((project, index) => (
							<div
								key={project.id}
								className={`${styles.card} w-96 h-auto flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 ${index % 2 === 0 ? styles['card--even'] : styles['card--odd']
									}`}
							>
								<div className="p-8">

									<h3 className={`${styles.title} text-3xl font-bold mb-2 text-gray-600`}>{project.title}</h3>
									<p className="text-xl  text-gray-600">{project.year} </p>
									<p className="text-gray-600 border-b-2 pb-3"> {project.location}</p>
									<p className="text-lg mt-3 text-gray-600">{project.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<p className="text-center text-gray-500 mt-8">More in-depth on my LinkedIn</p>
		</section>
	)
}


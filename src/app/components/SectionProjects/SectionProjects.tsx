"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
	{
		id: 1,
		title: 'Worlds Best Story',
		year: 'Jun 2015 - Nov 2015',
		location: 'Canada',
		description: 'Web designer responsible for WordPress theme integration and customization to support brand storytelling.'
	},
	{
		id: 2,
		title: 'Collège de Maisonneuve',
		year: '2012 - 2016',
		location: 'Montreal, Canada',
		description: 'Gained hands-on experience in multimedia, including website development, video game design, and 3D modeling.'
	},
	{
		id: 3,
		title: 'Agence Ninja',
		year: 'Apr 2016 - May 2016',
		location: 'Repentigny, Canada',
		description: 'Internship focusing on WordPress development and graphic design, creating business cards and marketing materials.'
	},
	{
		id: 4,
		title: 'Lithium Marketing',
		year: 'May 2016 - Apr 2017',
		location: 'Granby, Canada',
		description: 'Developed custom WordPress websites from scratch using core functions, improving client reach and engagement.'
	},
	{
		id: 5,
		title: 'TC Media',
		year: '2017',
		location: 'Montréal, Canada',
		description: 'Collaborated with TC Media as a consultant from Logient, migrating and modernizing their website with original templates and custom functions.'
	},
	{
		id: 6,
		title: 'Logient',
		year: '2017 - 2019',
		location: 'Montréal, Canada',
		description: 'Developed web applications with Angular, NodeJS, and WordPress, focusing on optimized, modern web technologies.'
	},
	{
		id: 7,
		title: 'Purr Digital',
		year: '2019',
		location: 'London, United Kingdom',
		description: 'Built and maintained WordPress websites, created custom Gutenberg blocks, and provided ticket support.'
	},
	{
		id: 8,
		title: 'Shape Works',
		year: '2022 - Today',
		location: 'London, England, United Kingdom',
		description: 'Web Engineer working with modern frontend tools, enhancing user experiences through tailored web solutions.'
	},
]

export default function SectionProjects() {
	const sectionRef = useRef(null)
	const triggerRef = useRef(null)
	const titleRef = useRef(null)

	useEffect(() => {
		const pin = gsap.fromTo(
			sectionRef.current,
			{
				translateX: 0,
			},
			{
				translateX: `-${20 * (projects.length - 1)}vw`, // Adjusts translation based on project count
				ease: "none",
				duration: 1,
				scrollTrigger: {
					trigger: triggerRef.current,
					start: "top top",
					end: () => `+=${window.innerHeight * projects.length}`, // Sets end dynamically
					scrub: 0.6,
					pin: true,
				},
			}
		)

		const titleAnimation = gsap.fromTo(
			titleRef.current,
			{
				opacity: 0,
				y: 50,
			},
			{
				opacity: 1,
				y: 0,
				duration: 1,
				scrollTrigger: {
					trigger: triggerRef.current,
					start: "top center",
					toggleActions: "play none none reverse",
				},
			}
		)

		return () => {
			pin.kill()
			titleAnimation.kill()
		}
	}, [])

	return (
		<section className="h-screen bg-gray-800 overflow-hidden" ref={triggerRef}>
			<div className="container mx-auto px-4 pt-16">
				<h2 ref={titleRef} className="text-7xl font-bold mb-8 text-white opacity-0">"Leveling Up: My Developer Adventure" - Experience Timeline</h2>
			</div>
			<div className="container mx-auto flex items-center">
				<div ref={sectionRef} className="flex gap-12 px-4">
					{projects.map((project) => (
						<div
							key={project.id}
							className="w-96 h-auto flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
						>
							<img
								src={'/placeholder-image.png'}
								alt={`${project.title} thumbnail`}
								className="w-full h-72 object-cover"
							/>
							<div className="p-8">
								<h3 className="text-2xl font-bold mb-2">{project.title}</h3>
								<p className="text-gray-600">{project.year} - {project.location}</p>
								<p className="mt-4 text-gray-600">{project.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<p className="text-center text-gray-500 mt-8">More in-depth on my LinkedIn</p>
		</section>
	)
}

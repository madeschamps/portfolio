"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
	{ id: 1, title: 'Afro Lisbon', description: 'A brief description of Project 1' },
	{ id: 2, title: 'VinniDNA', description: 'A brief description of Project 2' },
	{ id: 3, title: 'Project 3', description: 'A brief description of Project 3' },
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
				translateX: "-80vw",
				ease: "none",
				duration: 1,
				scrollTrigger: {
					trigger: triggerRef.current,
					start: "top top",
					end: "2000 top",
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
				<h2 ref={titleRef} className="text-7xl font-bold mb-8 text-white opacity-0">Recent Projects</h2>
			</div>
			<div className="container mx-auto flex items-center">
				<div ref={sectionRef} className="flex gap-12 px-4">
					{projects.map((project) => (
						<div
							key={project.id}
							className="w-96 h-auto flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
						>
							<img
								src={'/afrolisbon-project-cover-min.png'}
								alt={`${project.title} thumbnail`}
								className="w-full h-72 object-cover"
							/>
							<div className="p-8">
								<h3 className="text-2xl font-bold mb-4">{project.title}</h3>
								<p className="text-gray-600">{project.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

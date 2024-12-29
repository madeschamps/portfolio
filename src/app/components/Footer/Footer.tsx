"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
	const footerContainerRef = useRef(null);

	useEffect(() => {
		const footerContainer = footerContainerRef.current;

		// Set initial position of the footer section
		gsap.set(footerContainer, { yPercent: -50 });

		// Create the animation timeline to reveal the footer
		const uncover = gsap.timeline({
			scrollTrigger: {
				trigger: ".conclusion", // Section before the contact section
				start: "bottom bottom", // Trigger when the bottom of the section hits the bottom of the viewport
				end: "bottom top", // End when the bottom of the section reaches the top of the viewport
				scrub: true,
			},
		});

		// Animate the footer upwards as you scroll
		uncover.to(footerContainer, { yPercent: 0, ease: "none" });
	}, []);

	return (

		<footer className="footer min-h-screen bg-gray-900 text-white">
			<section ref={footerContainerRef} className="footer-container min-h-screen flex justify-center items-center">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Collaborate?</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						I&#39;m always excited to work on new projects and bring innovative ideas to life. Let&#39;s create something amazing together!
					</p>
					<div className="inline-block">
						<a
							href="mailto:marc.andre.deschamps@gmail.com"
							className="text-2xl md:text-6xl font-semibold hover:underline transition-colors duration-300"
						>
							marc.andre.deschamps@gmail.com
						</a>
					</div>
					<p className="mt-6 text-gray-400">
						&#34;Don&#39;t be shy—let&#39;s chat! I&#39;m ready to connect, whether it&#39;s in English, French, Portuguese, Italian, Spanish, or even code!&#34;
					</p>
				</div>
			</section>
		</footer>
	);
}

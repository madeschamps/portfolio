'use client'
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from './Section1.module.scss';

export default function Section1() {
	const topHalfRef = useRef(null);
	const bottomHalfRef = useRef(null);
	const revealTextRef = useRef(null);
	const sectionRef = useRef(null);
	const introTextName = useRef(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Words to cycle through
		const hiTexts = ["Hi", "Bonjour", "Olá", "Ciao", "Hola",];
		const hiTextElement = document.getElementById("hiText");

		let currentTextIndex = 0;

		if (hiTextElement) {
			const cycleText = () => {
				gsap.to(hiTextElement, {
					duration: 0.5,
					onComplete: () => {
						currentTextIndex = (currentTextIndex + 1) % hiTexts.length;
						hiTextElement.textContent = hiTexts[currentTextIndex];

						gsap.to(hiTextElement, {
							duration: 0.5,
							delay: currentTextIndex === 0 ? 2 : 0.15, // Delay 2 seconds on "Hi"
							onComplete: cycleText, // Recursively call to cycle through the words
						});
					}
				});
			};
			// Start cycling the text
			cycleText();
		}

		gsap.fromTo(
			introTextName.current,
			{ y: "0%" }, // Start from neutral
			{
				y: "-35%",
				ease: "power3.inOut",
				scrollTrigger: {
					trigger: sectionRef.current, // Trigger the animation on this section
					start: "40% center", // Animation starts when top of the section hits 10% of the viewport height
					end: "bottom 80%", // Ends when the bottom of the section reaches the center of the viewport
					scrub: true, // Scrub the animation based on the scroll
				}
			}
		);

		// Top half split animation
		gsap.fromTo(
			topHalfRef.current,
			{ y: "0%" }, // Start from neutral
			{
				y: "-35%",
				ease: "power3.inOut",
				scrollTrigger: {
					trigger: sectionRef.current, // Trigger the animation on this section
					start: "40% center", // Animation starts when top of the section hits 10% of the viewport height
					end: "bottom 80%", // Ends when the bottom of the section reaches the center of the viewport
					scrub: true, // Scrub the animation based on the scroll
				}
			}
		);

		// Bottom half split animation
		gsap.fromTo(
			bottomHalfRef.current,
			{
				y: "0%",
			}, // Start from neutral
			{
				y: "35%",
				ease: "power3.inOut",
				scrollTrigger: {
					trigger: sectionRef.current, // Use the section as the trigger
					start: "40% center",
					end: "bottom 80%",
					scrub: true, // Scrub the animation in sync with scroll
				}
			}
		);

		// Reveal text fade-in animation
		gsap.fromTo(
			revealTextRef.current,
			{
				opacity: 0,
				scaleY: "0.5",
			}, // Start with opacity 0
			{
				opacity: 1,
				scaleY: "1",
				ease: "power2.inOut",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "48% center",
					end: "bottom 80%",
					scrub: true, // Fade-in syncs with scrolling
				}
			}
		);

	}, []);



	return (
		<section ref={sectionRef} className={`${styles.module} h-screen flex items-center justify-center`}>
			<div className="relative">
				<div>
					<div ref={introTextName} className={`${styles.introText}`}>
						<div className={`${styles.introTextLeft}`}>
							<span className={`${styles.hiText}`} id="hiText">
								Hi
							</span>
							<span className={`${styles.amText}`}>I'm</span>
						</div>
						<span className={`${styles.title}`}>Marc-André</span>
					</div>
					{/* <span className="text-1xl">..can be a pain to pronounce, I know</span> */}
				</div>

				<div id="textToSplit" className={`${styles.textToSplit} relative `}>
					<div ref={topHalfRef} className="overflow-hidden">
						<span className={`${styles.halfText} block `}>CODE SURGEON</span>
					</div>
					<div ref={bottomHalfRef} className="overflow-hidden">
						<span className={`${styles.halfText} ${styles['halfText--bottom']} block `} style={{ transform: 'translateY(-50%)' }}>CODE SURGEON</span>
					</div>
					<p ref={revealTextRef} id="revealText" className={`${styles.revealText}  font-bold `}>
						Web Developer
					</p>
				</div>
				<div>
					<svg className={`${styles.icon}`} width="800px" height="800px" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M154.993 58.1402C161.765 52.7802 172.886 50.6894 181.749 50.1116C201.422 48.8297 224.834 58.6513 230.478 76.6101C240.327 107.943 207.746 149.833 168.866 132.275C150.45 123.958 143.931 109.568 144.385 91.7703" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M151.664 150.232C148.972 151.321 150.777 150.651 148.137 158.291C141.416 188.552 150.655 241.857 151.027 243.18" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M232.254 250.683C230.709 250.578 229.171 250.447 227.696 250.101C226.64 249.852 225.622 249.52 224.608 249.184C222.574 248.668 186.707 247.025 183.193 247.054C179.307 247.089 162.991 247.265 159.12 247.054C156.262 246.898 153.726 246.262 151.688 244.823" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M230.789 252.147C232.906 307.572 230.789 341.347 230.789 346.795C230.789 350.013 241.076 351.166 246.902 349.595" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
						<path d="M246.902 200.796C244.895 201.679 237.456 195.166 235.354 195.538C233.089 195.934 230.77 196.146 228.474 196.384C225.613 196.68 222.782 196.863 219.921 196.505C212.824 195.606 195.723 192.78 188.955 190.496C181.768 188.067 152.751 161.712 151.688 159.863" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
						<path opacity="0.503384" d="M313.021 156.075C311.295 157.462 289.092 195.392 287.861 197.186C287.318 197.971 286.745 198.74 286.185 199.511C285.192 200.879 284.244 202.593 282.891 203.611C279.964 205.813 229.564 205.061 225.13 203.611" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
						<path opacity="0.503384" d="M105.279 252.684C107.384 250.794 110.386 249.609 113.555 249.412C114.441 249.448 188.977 251.476 192.637 252.201C196.089 252.889 200.171 253.761 202.917 255.623" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
						<path opacity="0.503384" d="M176 350C174.464 349.695 173.127 349.137 171.992 348.335C171.343 347.969 170.694 347.601 170.042 347.237C168.948 346.637 167.857 346.04 166.763 345.439C163.339 343.557 159.583 341.976 155.668 340.682C153.286 339.998 150.871 339.391 148.356 339.017C147.671 338.995 146.994 338.994 146.309 339.017C145.529 339.144 144.773 339.302 144.015 339.49C141.807 340.263 139.739 341.182 137.741 342.21C135.236 343.697 130.378 346.74 128 348.335" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
						<path opacity="0.503384" d="M108.868 233.042C100 212 89.6416 172.318 89.6694 148.817" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
						<path opacity="0.503384" d="M151.32 247.753L150.996 321" stroke="#FFFFFF" stroke-opacity="0.9" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
			</div>
		</section>
	);
}

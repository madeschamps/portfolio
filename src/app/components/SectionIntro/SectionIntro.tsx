'use client'
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from './SectionIntro.module.scss';

export default function SectionIntro() {
	const topHalfRef = useRef(null);
	const bottomHalfRef = useRef(null);
	const revealTextRef = useRef(null);
	const sectionRef = useRef(null);
	const introTextName = useRef(null);
	const imageProfile = useRef(null);

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
				y: "-30%",
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
				y: "30%",
				ease: "power3.inOut",
				scrollTrigger: {
					trigger: sectionRef.current, // Use the section as the trigger
					start: "40% center",
					end: "bottom 80%",
					scrub: true, // Scrub the animation in sync with scroll
				}
			}
		);

		//Image
		gsap.fromTo(
			imageProfile.current,
			{ y: "10%" }, // Start from neutral
			{
				y: "0%",
				ease: "power3.inOut",
				scrollTrigger: {
					trigger: sectionRef.current, // Trigger the animation on this section
					start: "40% center", // Animation starts when top of the section hits 10% of the viewport height
					end: "bottom 80%", // Ends when the bottom of the section reaches the center of the viewport
					scrub: true, // Scrub the animation based on the scroll
				}
			}
		);

		// Reveal text fade-in animation
		gsap.fromTo(
			revealTextRef.current,
			{
				opacity: 0,
				scaleY: "0.5",
				y: "-50%",
			}, // Start with opacity 0
			{
				opacity: 1,
				scaleY: "1",
				y: "-50%",
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
			<div className="">
				<div className={styles.content}>
					<div>
						<div ref={introTextName} className={`${styles.introText}`}>
							<div className={`${styles.introTextLeft}`}>
								<span className={`${styles.hiText}`} id="hiText">
									Hi
								</span>
								<span className={`${styles.amText}`}>I'm</span>
							</div>
							<span className={`${styles.myName}`}>Marc-André</span>
						</div>
						{/* <span className="text-1xl">..can be a pain to pronounce, I know</span> */}
					</div>

					<div id="textToSplit" className={`${styles.textToSplit} relative `}>
						<div ref={topHalfRef} className={`${styles.halfTextParent} overflow-hidden`}>
							<span className={`${styles.halfText} block `}>CODE SURGEON</span>
						</div>
						<div ref={bottomHalfRef} className={`${styles.halfTextBottomParent} overflow-hidden`}>
							<span className={`${styles.halfText} ${styles['halfText--bottom']} block `}>CODE SURGEON</span>
						</div>
						<p ref={revealTextRef} id="revealText" className={`${styles.revealText}  font-bold `}>
							Web Developer
						</p>
					</div>
				</div>
				<div className={styles.imageProfileWrapper}>
					<img ref={imageProfile} className={styles.imageProfile} src={'/test-photo-profile.png'} alt="Me" />
				</div>
			</div>
		</section>
	);
}

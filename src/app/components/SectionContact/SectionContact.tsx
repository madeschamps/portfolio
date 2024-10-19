"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionContact() {

	return (
		<div className="scroller relative z-10 shadow-lg shadow-slate-900/20 shadow-b-2 shadow-r-[3px] -shadow-spread-2">
			<section className="conclusion min-h-screen bg-gray-500 ">Some content here</section>
		</div>
	);
}

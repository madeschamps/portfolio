"use client"

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
	{ id: 1, title: 'Worlds Best Story', year: '2015', description: 'WordPress theme integration and customization for brand storytelling.' },
	{ id: 3, title: 'Agence Ninja', year: '2016', description: 'WordPress development internship and graphic design for marketing materials.' },
	{ id: 4, title: 'Lithium Marketing', year: '2016-17', description: 'Developed custom WordPress websites from scratch using core functions.' },
	{ id: 5, title: 'TC Media', year: '2017', description: 'Website migration and modernization with original templates and custom functions.' },
	{ id: 6, title: 'Logient', year: '2017-19', description: 'Web applications with Angular, NodeJS, and WordPress, focusing on modern technologies.' },
	{ id: 7, title: 'Purr Digital', year: '2019', description: 'Built WordPress websites, created custom Gutenberg blocks, and provided support.' },
	{ id: 8, title: 'Shape Works', year: '2022-Present', description: 'Web Engineer working with modern frontend tools for tailored web solutions.' },
]

export default function Section3DTimeline() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const sectionRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!canvasRef.current || !sectionRef.current) return

		const scene = new THREE.Scene()
		scene.background = new THREE.Color(0x1a1a1a)
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
		const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true })
		renderer.setSize(window.innerWidth, window.innerHeight)

		// Lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 2)
		scene.add(ambientLight)
		const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
		directionalLight.position.set(0, 10, 5)
		scene.add(directionalLight)

		// Floor plane
		const planeGeometry = new THREE.PlaneGeometry(20, projects.length * 80)
		const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a2a })
		const plane = new THREE.Mesh(planeGeometry, planeMaterial)
		plane.rotation.x = -Math.PI / 2
		scene.add(plane)

		// Ball
		const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32)
		const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xe15600 })
		const ball = new THREE.Mesh(ballGeometry, ballMaterial)
		ball.position.set(0, 0.5, 10)
		ball.castShadow = true
		scene.add(ball)

		// Camera position
		camera.position.set(0, 15, 20)
		camera.lookAt(0, 0, 0)

		const textMeshes: THREE.Mesh[] = []
		const loader = new FontLoader()
		loader.load('./Outfit.json', (font) => {
			projects.forEach((project, index) => {
				const baseZ = -index * 40 - 10

				// Description
				const descGeometry = new TextGeometry(wrapText(project.description, 25), {
					font: font,
					size: 1,
					height: 0.05,
				})
				const descMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
				const descMesh = new THREE.Mesh(descGeometry, descMaterial)
				descMesh.position.set(-9, 0.1, baseZ)
				descMesh.rotation.x = -Math.PI / 2
				scene.add(descMesh)
				textMeshes.push(descMesh)

				// Title - Positioned right below the description
				const titleGeometry = new TextGeometry(project.title, {
					font: font,
					size: 1.5,
					height: 0.1,
				})
				const titleMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
				const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial)
				titleMesh.position.set(-9, 0.1, baseZ - 3) // Offset by 3 units below the description
				titleMesh.rotation.x = -Math.PI / 2
				scene.add(titleMesh)
				textMeshes.push(titleMesh)

				// Year - Positioned separately as before
				const yearGeometry = new TextGeometry(project.year, {
					font: font,
					size: 2.5,
					height: 0.3,
				})
				const yearMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
				const yearMesh = new THREE.Mesh(yearGeometry, yearMaterial)
				yearMesh.position.set(4, 1, baseZ - 10) // Positioned independently as before
				yearMesh.rotation.y = -Math.PI / 5
				scene.add(yearMesh)
				textMeshes.push(yearMesh)
			})
		})

		// Animation
		const animate = () => {
			requestAnimationFrame(animate)
			renderer.render(scene, camera)
		}
		animate()

		// Scroll-based animation
		gsap.to(ball.position, {
			z: -projects.length * 40 + 10,
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top top",
				end: "bottom bottom",
				scrub: true,
			},
		})

		gsap.to(camera.position, {
			z: -projects.length * 40 + 25,
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top top",
				end: "bottom bottom",
				scrub: true,
			},
		})

		// Resize handler
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			ScrollTrigger.getAll().forEach((t) => t.kill())
		}
	}, [])

	return (
		<section ref={sectionRef} className="h-[800vh] bg-gray-900">
			<canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />
			<div className="relative z-10 p-8 text-white">
				<h2 className="text-4xl font-bold mb-4">My Journey</h2>
				<p className="text-xl">Scroll down to explore my professional timeline...</p>
			</div>
		</section>
	)
}

function wrapText(text: string, maxLength: number): string {
	const words = text.split(' ')
	let lines: string[] = []
	let currentLine = ''

	words.forEach(word => {
		if ((currentLine + word).length <= maxLength) {
			currentLine += (currentLine ? ' ' : '') + word
		} else {
			lines.push(currentLine)
			currentLine = word
		}
	})
	lines.push(currentLine)

	return lines.join('\n')
}

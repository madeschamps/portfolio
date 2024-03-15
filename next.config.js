/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	output: 'export',
	path: `${basePath}/_next/image`,

	images: {
		unoptimized: true,
	},
}

module.exports = nextConfig
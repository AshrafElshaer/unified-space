/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@unified/ui"],
	experimental: {
		nodeMiddleware: true,
	},
};

export default nextConfig;

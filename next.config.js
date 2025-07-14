/** @type {import('next').NextConfig} */
const nextConfig = {
    // Performance optimizations
    experimental: {
        optimizeCss: true,
    },
    // Optimize images
    images: {
        minimumCacheTTL: 60,
    },
    // Reduce bundle size
    webpack: (config, { dev, isServer }) => {
        // Optimize for production
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            };
        }
        return config;
    },
    // Reduce memory usage
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },
}

module.exports = nextConfig

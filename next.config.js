/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/sus",
                destination: "/sus.txt",
            },
            {
                source: "/keycodes",
                destination: "/keycodes.txt",
            },
        ];
    },
};

module.exports = nextConfig;

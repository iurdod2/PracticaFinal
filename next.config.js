module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://bildy-rpmaya.koyeb.app/api/:path*',
            },
        ];
    },
};

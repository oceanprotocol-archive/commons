const config = {
    app: {
        port: process.env.SERVER_PORT || 4000,
        nodeScheme: process.env.NODE_SCHEME || 'https',
        nodeHost: process.env.NODE_HOST || 'nile.dev-ocean.com',
        nodePort: process.env.NODE_PORT || 443,
        aquariusScheme: process.env.AQUARIUS_SCHEME || 'https',
        aquariusHost:
            process.env.AQUARIUS_HOST || 'nginx-aquarius.dev-ocean.com',
        aquariusPort: process.env.AQUARIUS_PORT || 443,
        brizoScheme: process.env.BRIZO_SCHEME || 'https',
        brizoHost: process.env.BRIZO_HOST || 'nginx-brizo.dev-ocean.com',
        brizoPort: process.env.BRIZO_PORT || 443,
        brizoAddress:
            process.env.BRIZO_ADDRESS ||
            '0x376817c638d2a04f475a73af37f7b51a2862d567',
        parityScheme: process.env.PARITY_SCHEME || 'https',
        parityHost: process.env.PARITY_HOST || 'nile.dev-ocean.com',
        parityPort: process.env.PARITY_PORT || 443,
        secretStoreScheme: process.env.SECRET_STORE_SCHEME || 'https',
        secretStoreHost:
            process.env.SECRET_STORE_HOST || 'secret-store.dev-ocean.com',
        secretStorePort: process.env.SECRET_STORE_PORT || 443,
        verbose: true
    }
}

export default config

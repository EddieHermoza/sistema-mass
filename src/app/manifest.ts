import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Sistema Mass',
        short_name: 'MassPWA',
        description: 'Sistema para el curso de Calidad de Software',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#000000',
        theme_color: '#facc15',
        icons: [
            {
                src: '/icon-72x72.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-96x96.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icon-128x128.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-144x144.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icon-152x152.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-384x384.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
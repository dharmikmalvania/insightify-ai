import { VitePWA } from 'vite-plugin-pwa'

plugins: [
  VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Insightify AI',
      short_name: 'Insightify',
      theme_color: '#111827',
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    }
  })
]

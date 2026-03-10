import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
    base: '/admin/',
    plugins: [react(), tailwind()],
    server: {
        port: 5174,
        proxy: {
            '/api': {
                target: 'https://localhost:3001',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});

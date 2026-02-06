import { defineConfig } from 'vite';

export default defineConfig({
    root: './', // Root is now the project folder
    build: {
        outDir: 'dist',
    },
    server: {
        proxy: {
            '/socket.io': {
                target: 'http://localhost:3000', // Point to your server port
                ws: true
            }
        }
    }
});
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    publicDir: 'public',
    copyPublicDir: true,
    build: {
        outDir: resolve(__dirname, 'dist'),
        copyPublicDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },

    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, './index.html'),
            },
        },
        copyPublicDir: true,
    },
    publicDir: 'src',
    css: {
        postcss: './postcss.config.js',
    },
    server: {
        historyApiFallback: true,
    },
});

import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false,
            },
        },
    },
    resolve: {
        alias: {
            '~config': path.resolve(__dirname, './src/config'),
            '~core': path.resolve(__dirname, './src/core'),
            '~layout': path.resolve(__dirname, './src/layout'),
            '~modules': path.resolve(__dirname, './src/modules'),
            '~routers': path.resolve(__dirname, './src/routers'),
            '~components': path.resolve(__dirname, './src/shared/components'),
            '~helper': path.resolve(__dirname, './src/shared/helper'),
            '~hook': path.resolve(__dirname, './src/shared/hook'),
            '~view': path.resolve(__dirname, './src/view'),
        },
    },
    plugins: [react()],
});

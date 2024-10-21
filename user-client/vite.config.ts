import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~config': path.resolve(__dirname, './src/config'),
            '~core': path.resolve(__dirname, './src/core'),
            '~layout': path.resolve(__dirname, './src/layout'),
            '~routers': path.resolve(__dirname, './src/routers'),
            '~components': path.resolve(__dirname, './src/shared/components'),
            '~view': path.resolve(__dirname, './src/view'),
        },
    },
    plugins: [react()],
});

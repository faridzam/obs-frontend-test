import react from '@vitejs/plugin-react-swc';
import path from "path";
import { defineConfig } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  preview: {
    port: 3001,
    strictPort: true
  },
  server: {
    port: 3001,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3001",
  },
  resolve: {
    alias: [
      {find: '@', replacement: path.resolve(__dirname, 'src')},
    ]
  }
})

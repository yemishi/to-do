import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: 'dist', // Diretório de saída para a construção
    assetsDir: 'assets', // Diretório de ativos
  },
});
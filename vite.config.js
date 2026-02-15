import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/js/design-system.js'),
      name: 'DesignSystem',
      fileName: (format) => `design-system.js`, // Gera dist/js/design-system.js (formato ES/UMD depende da config, padrão é ES+UMD se array)
      formats: ['umd'] // Forçando UMD para garantir compatibilidade máxima com script tag simples no legado
    },
    rollupOptions: {
      // Bootstrap deve ser empacotado junto (não external), pois queremos um bundle único
      // jQuery é externo pois o legado já tem
      external: ['jquery'],
      output: {
        globals: {
          jquery: 'jQuery',
          'bootstrap': 'bootstrap' // Caso fosse externo
        },
        // Força o nome do arquivo exato sem sufixo .umd
        entryFileNames: 'design-system.js'
      }
    },
    outDir: 'dist/js',
    emptyOutDir: false, // Não limpar para não apagar o CSS gerado pelo Sass
    sourcemap: true
  }
});

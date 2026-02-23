import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

const loggerSilenciarDeprecacoesSass = {
  warn(message, opts) {
    if (opts?.deprecation || (typeof message === 'string' && message.includes('repetitive') && message.includes('omitted'))) return;
    const { stderr } = process;
    if (typeof stderr?.write === 'function') stderr.write(`WARNING: ${message}\n`);
  },
  debug(message, opts) {
    if (opts?.deprecation) return;
    const { stderr } = process;
    if (typeof stderr?.write === 'function') stderr.write(`DEBUG: ${message}\n`);
  }
};

export default defineConfig({
  server: {
    // Servir dist/ em /dist para a documentação usar design-system.css e design-system.js compilados
    fs: { allow: ['.', path.join(__dirname, 'dist')] }
  },
  plugins: [
    {
      name: 'serve-dist',
      configureServer(server) {
        server.middlewares.use('/dist', (req, res, next) => {
          const subPath = req.url.replace(/^\//, '') || 'index.html';
          const file = path.join(__dirname, 'dist', subPath);
          if (fs.existsSync(file) && fs.statSync(file).isFile()) {
            const ext = path.extname(file);
            const types = { '.js': 'application/javascript', '.css': 'text/css', '.map': 'application/json' };
            res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
            fs.createReadStream(file).pipe(res);
          } else next();
        });
      }
    }
  ],
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
  },
  css: {
    preprocessorOptions: {
      scss: {
        logger: loggerSilenciarDeprecacoesSass,
      },
      sass: {
        logger: loggerSilenciarDeprecacoesSass,
      },
    },
  }
});

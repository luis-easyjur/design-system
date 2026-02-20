/**
 * Escopa o bundle SaaS em #app .rebranding e garante prioridade sobre o legado:
 * - Substitui :root por #app .rebranding e prefixa seletores com #app .rebranding
 * - Adiciona !important em todas as declarações para vencer o legado que usa !important
 * - Converte rem → px (base 16px) para não depender do font-size do html do legado (11px)
 */
import postcss from 'postcss';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distCss = join(__dirname, '..', 'dist', 'css');
const WRAPPER = '#app .rebranding';

function splitSelectors(selector) {
  const partes = [];
  let profundidade = 0;
  let inicio = 0;
  for (let i = 0; i < selector.length; i++) {
    const c = selector[i];
    if (c === '(') profundidade++;
    else if (c === ')') profundidade--;
    else if (c === ',' && profundidade === 0) {
      partes.push(selector.slice(inicio, i).trim());
      inicio = i + 1;
    }
  }
  partes.push(selector.slice(inicio).trim());
  return partes;
}

function escoparSelector(selector) {
  return splitSelectors(selector)
    .map((parte) => (parte === ':root' ? WRAPPER : `${WRAPPER} ${parte}`))
    .join(', ');
}

const escoparSaas = () => ({
  postcssPlugin: 'escopar-saas',
  Rule(rule) {
    if (rule.parent?.type === 'atrule' && rule.parent.name === 'keyframes') return;
    if (rule.selector.includes(WRAPPER)) return; // Evita prefixar múltiplas vezes se o script rodar de novo
    rule.selector = escoparSelector(rule.selector);
  },
});
escoparSaas.postcss = true;

const adicionarImportant = () => ({
  postcssPlugin: 'adicionar-important',
  Declaration(decl) {
    if (!decl.important) decl.important = true;
  },
});
adicionarImportant.postcss = true;

const REM_BASE_PX = 16;
const remParaPx = () => ({
  postcssPlugin: 'rem-para-px',
  Declaration(decl) {
    if (!decl.value || !decl.value.includes('rem')) return;
    decl.value = decl.value.replace(/(-?\d*\.?\d+)rem\b/g, (_, num) => {
      const px = parseFloat(num) * REM_BASE_PX;
      return `${Math.round(px * 100) / 100}px`;
    });
  },
});
remParaPx.postcss = true;

const arquivos = ['saas.css', 'saas.min.css'];

async function run() {
  for (const arquivo of arquivos) {
    const caminho = join(distCss, arquivo);
    try {
      const css = await readFile(caminho, 'utf8');
      const result = await postcss([escoparSaas, adicionarImportant, remParaPx]).process(css, { from: caminho });
      await writeFile(caminho, result.css);
      console.log(`postcss escopar-saas + important + rem→px: ${arquivo}`);
    } catch (e) {
      if (e.code === 'ENOENT') continue;
      throw e;
    }
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

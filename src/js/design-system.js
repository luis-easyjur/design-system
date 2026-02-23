// =============================================================================
// Design System EasyJur - Bundle JS Principal
// Inclui Bootstrap 5 e Patches de Compatibilidade
// =============================================================================

// 1. Importar Bootstrap e expor globalmente
// Necessário para que o sistema legado e os patches acessem 'bootstrap'
import * as bootstrapModule from 'bootstrap';

// Cria um objeto mutável para permitir patches (Bootstrap 5 via import * é read-only)
const bootstrap = { ...bootstrapModule };
window.bootstrap = bootstrap;

// 1.1 Importar Lucide Icons (caminho explícito: package.json "module" aponta para arquivo inexistente)
import { createIcons, icons } from 'lucide/dist/esm/lucide/src/lucide.js';

// Wrapper para createIcons que injeta os ícones automaticamente
const createIconsWrapper = (options = {}) => {
  return createIcons({
    icons,
    ...options
  });
};

// Expor globalmente para a documentação
window.lucide = {
  createIcons: createIconsWrapper,
  icons
};

// Função helper para inicializar ícones
window.initIcons = () => createIconsWrapper();

// Inicializa ícones automaticamente no load
document.addEventListener('DOMContentLoaded', () => {
  createIconsWrapper();
});

// 2. Importar Flatpickr (date picker) e expor globalmente
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
window.flatpickr = flatpickr;

// 3. Importar Patches
import { initRebrandPatch, initLegacyModalConflict } from './utils/bootstrap-patch';

// 4. Inicializar Patches
initRebrandPatch();
initLegacyModalConflict();

// 5. Exportar (opcional, para uso modular se necessário no futuro)
export default bootstrap;

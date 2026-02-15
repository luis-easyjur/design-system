// =============================================================================
// Design System EasyJur - Bundle JS Principal
// Inclui Bootstrap 5 e Patches de Compatibilidade
// =============================================================================

// 1. Importar Bootstrap e expor globalmente
// Necessário para que o sistema legado e os patches acessem 'bootstrap'
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

// 2. Importar Patches
import { initRebrandPatch, initLegacyModalConflict } from './utils/bootstrap-patch';

// 3. Inicializar Patches
// Executa imediatamente para garantir que o ambiente esteja pronto
initRebrandPatch();
initLegacyModalConflict();

// 4. Exportar (opcional, para uso modular se necessário no futuro)
export default bootstrap;

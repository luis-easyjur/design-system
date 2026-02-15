// rebrand-bootstrap-patch.js --------------------------------------------------
// Portado para ES Module para o Design System
// --------------------------------------------------

export function initRebrandPatch() {
    // Garante que o Bootstrap está disponível globalmente ou no escopo
    const bootstrap = window.bootstrap;
    if (!bootstrap) {
        console.error('[rebrand‑patch] Bootstrap não encontrado no window.bootstrap');
        return;
    }

    /* Utilitário --------------------------------------------------- */
    const inRebrand = el => el.closest('.rebrand') || el.closest('.rebranding') || el.closest('#app .rebranding');

    /* Tooltip ------------------------------------------------------ */
    const OriginalTooltip = bootstrap.Tooltip;
    class PatchedTooltip extends OriginalTooltip {
        constructor(element, options = {}) {
            if (inRebrand(element) && !options.container) options.container = '#app .rebranding';
            super(element, options);
        }
    }
    bootstrap.Tooltip = PatchedTooltip;

    /* Popover ------------------------------------------------------ */
    const OriginalPopover = bootstrap.Popover;
    class PatchedPopover extends OriginalPopover {
        constructor(element, options = {}) {
            if (inRebrand(element) && !options.container) options.container = '#app .rebranding';
            super(element, options);
        }
    }
    bootstrap.Popover = PatchedPopover;

    /* Toast -------------------------------------------------------- */
    const OriginalToast = bootstrap.Toast;
    class PatchedToast extends OriginalToast {
        constructor(element, options) {
            const scope = inRebrand(element);
            if (scope && !element.closest('.toast-container')) {
                let container = scope.querySelector('.toast-container');
                if (!container) {
                    container = document.createElement('div');
                    container.className = 'toast-container position-fixed top-0 end-0 p-3';
                    scope.appendChild(container);
                }
                container.appendChild(element);
            }
            super(element, options);
        }
    }
    bootstrap.Toast = PatchedToast;

    /* Modal -------------------------------------------------------- */
    const OriginalModal = bootstrap.Modal;
    class PatchedModal extends OriginalModal {
        constructor(element, options) {
            const scope = inRebrand(element);
            // Se o modal está no DOM mas fora do escopo, move ele pra dentro
            if (scope && !scope.contains(element)) scope.appendChild(element);
            super(element, options);
        }
    }
    bootstrap.Modal = PatchedModal;

    /* Offcanvas ---------------------------------------------------- */
    const OriginalOffcanvas = bootstrap.Offcanvas;
    class PatchedOffcanvas extends OriginalOffcanvas {
        constructor(element, options) {
            const scope = inRebrand(element);
            if (scope && !scope.contains(element)) scope.appendChild(element);
            super(element, options);
        }
    }
    bootstrap.Offcanvas = PatchedOffcanvas;

    /* Helper global opcional -------------------------------------- */
    window.initRebrandTooltipsAndPopovers = function (root = document) {
        root.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            if (!bootstrap.Tooltip.getInstance(el)) new bootstrap.Tooltip(el);
        });
        root.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
            if (!bootstrap.Popover.getInstance(el)) new bootstrap.Popover(el);
        });
    };

    console.log('[Design System] Bootstrap Patched for Rebranding');
}

export function initLegacyModalConflict() {
    // Verifica se jQuery está disponível (necessário para o código legado)
    if (typeof jQuery === 'undefined') return;
    const $ = jQuery;

    // ... (Código do jQuery portado)
    // Plugin jQuery para detectar quando um elemento fica visível
    $.fn.onVisible = function (callback) {
        return this.each(function () {
            const el = this;
            const observer = new MutationObserver(() => {
                const visivel = $(el).is(':visible');
                if (visivel) callback.call(el);
            });
            observer.observe(el, {
                attributes: true,
                attributeFilter: ['style', 'class', 'hidden']
            });
        });
    };

    $.fn.onHidden = function (callback) {
        return this.each(function () {
            const el = this;
            const observer = new MutationObserver(() => {
                const visivel = $(el).is(':visible');
                if (!visivel) callback.call(el);
            });
            observer.observe(el, {
                attributes: true,
                attributeFilter: ['style', 'class', 'hidden']
            });
        });
    };

    $(function () {
        const relacaoModais = new Map();
        const SELETOR_MODAIS_BS5 = '.rebrand .modal, .rebranding .modal, #app .rebranding .modal'; // Atualizado seletor
        
        function existemModaisBS5Visiveis() {
            return $(SELETOR_MODAIS_BS5 + ':visible').length > 0;
        }
        
        function capturarModaisBS5Visiveis() {
            const modaisVisiveis = [];
            $(SELETOR_MODAIS_BS5 + ':visible').each(function() {
                modaisVisiveis.push({
                    elemento: this,
                    id: this.id || `bs5-modal-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                    zIndexOriginal: $(this).css('z-index')
                });
            });
            return modaisVisiveis;
        }
        
        function desativarModaisBS5Visiveis() {
            const modaisVisiveis = capturarModaisBS5Visiveis();
            if (modaisVisiveis.length > 0) {
                $(modaisVisiveis.map(modal => modal.elemento))
                    .prop('inert', true)
                    .css('z-index', 0)
                    .css('background-color', 'transparent');
            }
            return modaisVisiveis;
        }
        
        function restaurarModaisBS5(modais) {
            if (!modais?.length) return;
            modais.forEach(modal => {
                const $el = $(modal.elemento);
                $el.prop('inert', false).css('z-index', modal.zIndexOriginal);
                if ($('.modal_janela:visible').length === 0) {
                    $el.css('background-color', '');
                }
            });
        }

        const SELETOR_MODAIS_ANTIGOS = '.modal_janela';

        try {
            $(SELETOR_MODAIS_ANTIGOS).onVisible(function() {
                const modalAntigo = this;
                if (relacaoModais.has(modalAntigo)) return;
                
                if (existemModaisBS5Visiveis()) {
                    console.log(`[rebrand-bs-patch] Modal antigo aberto - Desativando modais BS5`);
                    const modaisAfetados = desativarModaisBS5Visiveis();
                    relacaoModais.set(modalAntigo, modaisAfetados);
                } else {
                    relacaoModais.set(modalAntigo, []);
                }
            });
            
            $(SELETOR_MODAIS_ANTIGOS).onHidden(function() {
                const modalAntigo = this;
                if (relacaoModais.has(modalAntigo)) {
                    const modaisAfetados = relacaoModais.get(modalAntigo);
                    if (modaisAfetados.length > 0) {
                        console.log(`[rebrand-bs-patch] Modal antigo fechado - Restaurando modais BS5`);
                        restaurarModaisBS5(modaisAfetados);
                    }
                    relacaoModais.delete(modalAntigo);
                }
            });
        } catch(e) {}
    });
}

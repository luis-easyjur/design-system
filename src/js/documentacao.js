const paginas = {
  cores: paginaCores,
  tipografia: paginaTipografia,
  espacamento: paginaEspacamento,
  grid: paginaGrid,
  breakpoints: paginaBreakpoints,
  containers: paginaContainers,
  gutters: paginaGutters,
  botoes: paginaBotoes,
  badges: paginaBadges,
  alertas: paginaAlertas,
  cards: paginaCards,
  accordion: paginaAccordion,
  modais: paginaModais,
  tooltips: paginaTooltips,
  progress: paginaProgress,
  spinners: paginaSpinners,
  toasts: paginaToasts,
  inputs: paginaInputs,
  selects: paginaSelects,
  checkboxes: paginaCheckboxes,
  switches: paginaSwitches,
  'input-group': paginaInputGroup,
  'form-layout': paginaFormLayout,
  validacao: paginaValidacao,
  navbar: paginaNavbar,
  breadcrumb: paginaBreadcrumb,
  tabs: paginaTabs,
  pagination: paginaPagination,
  dropdown: paginaDropdown,
  tabelas: paginaTabelas,
  'list-group': paginaListGroup,
  helpers: paginaHelpers
};

document.addEventListener('DOMContentLoaded', function() {
  carregarPagina('cores');

  const botoesNav = document.querySelectorAll('.nav-link[data-pagina]');
  botoesNav.forEach(botao => {
    botao.addEventListener('click', function() {
      const pagina = this.dataset.pagina;
      
      // Remove active de todos os botões
      botoesNav.forEach(b => {
        b.classList.remove('active', 'text-primary', 'fw-bold');
        b.classList.add('text-body');
      });
      
      // Adiciona active ao clicado
      this.classList.add('active', 'text-primary', 'fw-bold');
      this.classList.remove('text-body');
      
      carregarPagina(pagina);
    });
  });
});

function carregarPagina(pagina) {
  const conteudo = document.getElementById('conteudo-pagina');
  if (paginas[pagina]) {
    conteudo.innerHTML = paginas[pagina]();
    inicializarComponentesBootstrap();
  }
}

function inicializarComponentesBootstrap() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
}

function toggleCodigo(botao) {
  const card = botao.closest('.card');
  const codigoArea = card.querySelector('.card-footer');
  
  if (codigoArea.classList.contains('d-none')) {
    codigoArea.classList.remove('d-none');
    botao.innerHTML = '<i class="bi bi-code-slash me-1"></i> Ocultar';
    botao.classList.add('active');
  } else {
    codigoArea.classList.add('d-none');
    botao.innerHTML = '<i class="bi bi-code-slash me-1"></i> Código';
    botao.classList.remove('active');
  }
}

function trocarAba(botaoAba, abaAlvo) {
  const codigoArea = botaoAba.closest('.card-footer');
  
  // Remove active de todas as abas
  codigoArea.querySelectorAll('.nav-link').forEach(aba => aba.classList.remove('active'));
  botaoAba.classList.add('active');
  
  // Esconde todos os conteúdos e mostra o alvo
  codigoArea.querySelectorAll('.tab-pane').forEach(conteudo => {
    if(conteudo.id === abaAlvo) {
      conteudo.classList.add('show', 'active');
    } else {
      conteudo.classList.remove('show', 'active');
    }
  });
}

function componenteComCodigo(titulo, preview, codigoEasyjur, codigoLegalops, descricao = '') {
  const idUnico = 'code-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div class="card mb-4 shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center bg-body-tertiary">
        <h6 class="mb-0 text-uppercase small fw-bold text-body-secondary">${titulo}</h6>
        <button class="btn btn-sm btn-outline-secondary d-flex align-items-center" onclick="toggleCodigo(this)">
          <i class="bi bi-code-slash me-1"></i> Código
        </button>
      </div>
      <div class="card-body p-4 border-bottom">
        ${preview}
      </div>
      ${descricao ? `<div class="card-body bg-body-tertiary py-2 px-4 border-bottom small text-muted">${descricao}</div>` : ''}
      <div class="card-footer p-0 d-none">
        <ul class="nav nav-tabs nav-fill bg-body-tertiary border-bottom-0" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active rounded-0 border-top-0 border-start-0 py-2 small" onclick="trocarAba(this, '${idUnico}-easyjur')" type="button">EasyJur (SaaS)</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link rounded-0 border-top-0 border-end-0 py-2 small" onclick="trocarAba(this, '${idUnico}-legalops')" type="button">LegalOps (React)</button>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane fade show active" id="${idUnico}-easyjur" role="tabpanel">
            <pre class="m-0 p-3 bg-dark text-light small overflow-auto" style="max-height: 300px;"><code>${escapeHtml(codigoEasyjur)}</code></pre>
          </div>
          <div class="tab-pane fade" id="${idUnico}-legalops" role="tabpanel">
            <pre class="m-0 p-3 bg-dark text-light small overflow-auto" style="max-height: 300px;"><code>${escapeHtml(codigoLegalops)}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ===================== PÁGINAS =====================

function paginaCores() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Cores</h2>
      <p class="lead text-muted mb-4">As cores do EasyJur ajudam a manter a identidade visual em botões, textos, fundos e destaques. Use sempre as classes do sistema para garantir consistência.</p>
      <p class="mb-5 text-muted small">Para texto: <code>.text-primary</code>, <code>.text-secondary</code>. Para fundo: <code>.bg-primary</code>, <code>.bg-secondary</code>. Para botões e badges use as variantes <code>btn-primary</code>, <code>badge bg-primary</code>, etc.</p>

      <h3 class="h6 text-uppercase text-muted fw-bold mb-3 ls-1">Paleta principal</h3>
      <div class="row g-4 mb-5">
        <div class="col-md-4">
          <div class="card h-100 border">
            <div class="card-img-top" style="height: 120px; background-color: #e5293f;"></div>
            <div class="card-body">
              <h5 class="card-title fw-bold mb-1">Primária</h5>
              <p class="small text-muted mb-1">Ação principal, links, destaque.</p>
              <div class="mt-2"><span class="badge bg-dark font-monospace">#E5293F</span></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 border">
            <div class="card-img-top" style="height: 120px; background-color: #acbac2;"></div>
            <div class="card-body">
              <h5 class="card-title fw-bold mb-1">Secundária</h5>
              <p class="small text-muted mb-1">Ações secundárias, informações neutras.</p>
              <div class="mt-2"><span class="badge bg-dark font-monospace">#ACBAC2</span></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 border">
            <div class="card-img-top" style="height: 120px; background-color: #7f919a;"></div>
            <div class="card-body">
              <h5 class="card-title fw-bold mb-1">Terciária</h5>
              <p class="small text-muted mb-1">Destaque suave, elementos de apoio.</p>
              <div class="mt-2"><span class="badge bg-dark font-monospace">#7F919A</span></div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="h6 text-uppercase text-muted fw-bold mb-3 ls-1">Cores semânticas</h3>
      <p class="small text-muted mb-3">Para feedback rápido: sucesso, erro, aviso e informação.</p>
      <div class="row g-4 mb-5">
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #198754;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Success</div>
              <div class="small font-monospace text-muted">#198754</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #dc3545;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Danger</div>
              <div class="small font-monospace text-muted">#DC3545</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #ffc107;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Warning</div>
              <div class="small font-monospace text-muted">#FFC107</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #0dcaf0;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Info</div>
              <div class="small font-monospace text-muted">#0DCAF0</div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="h6 text-uppercase text-muted fw-bold mb-3 ls-1">Neutros</h3>
      <p class="small text-muted mb-3">Fundos e textos neutros para contraste e legibilidade.</p>
      <div class="row g-4">
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top border-bottom" style="height: 80px; background-color: #f8f9fa;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Light</div>
              <div class="small font-monospace text-muted">#F8F9FA</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #212529;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Dark</div>
              <div class="small font-monospace text-muted">#212529</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top border-bottom" style="height: 80px; background-color: #ffffff;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">White</div>
              <div class="small font-monospace text-muted">#FFFFFF</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card border h-100">
            <div class="card-img-top" style="height: 80px; background-color: #6c757d;"></div>
            <div class="card-body p-3">
              <div class="fw-bold small">Gray</div>
              <div class="small font-monospace text-muted">#6C757D</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function paginaTipografia() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Tipografia</h2>
      <p class="lead text-muted mb-4">Fonte Borna em toda a interface. Títulos, parágrafos, listas e citações seguem um padrão consistente para leitura e hierarquia.</p>

      ${componenteComCodigo('Headings',
        `<div class="d-flex flex-column gap-2">
          <h1>h1. Heading</h1>
          <h2>h2. Heading</h2>
          <h3>h3. Heading</h3>
          <h4>h4. Heading</h4>
          <h5>h5. Heading</h5>
          <h6>h6. Heading</h6>
        </div>`,
        `<div class="rebranding">
  <h1>h1. Heading</h1>
  <h2>h2. Heading</h2>
  <h3>h3. Heading</h3>
  <h4>h4. Heading</h4>
  <h5>h5. Heading</h5>
  <h6>h6. Heading</h6>
</div>`,
        `<h1>h1. Heading</h1>
<h2>h2. Heading</h2>
<h3>h3. Heading</h3>`,
        'Tags h1-h6 com tamanhos padrão do Bootstrap'
      )}

      ${componenteComCodigo('Display Headings',
        `<div class="d-flex flex-column gap-2">
          <h1 class="display-1">Display 1</h1>
          <h1 class="display-2">Display 2</h1>
          <h1 class="display-3">Display 3</h1>
        </div>`,
        `<div class="rebranding">
  <h1 class="display-1">Display 1</h1>
  <h1 class="display-2">Display 2</h1>
  <h1 class="display-3">Display 3</h1>
</div>`,
        `<Text variant="display1">Display 1</Text>
<Text variant="display2">Display 2</Text>`,
        'Headings maiores para destaque'
      )}

      ${componenteComCodigo('Texto',
        `<div class="d-flex flex-column gap-2">
          <p class="lead">Parágrafo de destaque (lead).</p>
          <p>Parágrafo normal com <strong>texto em negrito</strong>, <em>itálico</em> e <a href="#">link</a>.</p>
          <p><small>Texto pequeno (small)</small></p>
          <p class="text-muted">Texto secundário (muted)</p>
        </div>`,
        `<div class="rebranding">
  <p class="lead">Parágrafo de destaque.</p>
  <p>Parágrafo normal com <strong>negrito</strong>, <em>itálico</em>.</p>
  <p><small>Texto pequeno</small></p>
  <p class="text-muted">Texto secundário</p>
</div>`,
        `<Text variant="lead">Parágrafo de destaque</Text>
<Text>Parágrafo normal</Text>
<Text size="sm">Texto pequeno</Text>`,
        ''
      )}

      ${componenteComCodigo('Elementos inline (destaque, negrito, itálico)',
        `<p>Use <mark>mark</mark> para destacar, <strong>strong</strong> para negrito, <em>em</em> para itálico.</p>
        <p><small class="text-muted">Small</small> para texto secundário. <abbr title="Exemplo">abbr</abbr> com title mostra a explicação no hover.</p>`,
        `<p>Texto com <mark>destaque</mark>, <strong>negrito</strong>, <em>itálico</em>.</p>
<p><abbr title="Significado">abbr</abbr></p>`,
        `mark, strong, em, small, abbr`,
        ''
      )}

      ${componenteComCodigo('Citação (blockquote)',
        `<figure>
          <blockquote class="blockquote">
            <p>Uma citação bem conhecida, dentro de um blockquote.</p>
          </blockquote>
          <figcaption class="blockquote-footer">Autor no <cite>Livro ou Fonte</cite></figcaption>
        </figure>`,
        `<blockquote class="blockquote">
  <p>Texto da citação.</p>
</blockquote>
<figcaption class="blockquote-footer">Autor, fonte</figcaption>`,
        `blockquote e blockquote-footer para atribuição`,
        ''
      )}

      ${componenteComCodigo('Listas',
        `<ul class="list-unstyled mb-0">
          <li>Item sem marcador (list-unstyled)</li>
          <li>Outro item</li>
        </ul>
        <ol class="mt-2">
          <li>Lista ordenada</li>
          <li>Segundo item</li>
        </ol>`,
        `<ul class="list-unstyled">...</ul>
<ol>...</ol>`,
        `list-unstyled remove os marcadores da ul`,
        ''
      )}
    </section>
  `;
}

function paginaEspacamento() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Espaçamento</h2>
      <p class="lead text-muted mb-4">Margin e padding com classes curtas: <code>m-*</code> e <code>p-*</code>. O número (0 a 5) define o tamanho; as letras definem o lado (t, b, s, e, x, y ou nada para todos).</p>
      <p class="mb-4 text-muted small">Exemplos: <code>mt-3</code> (margin-top), <code>px-2</code> (padding horizontal), <code>mb-0</code> (sem margin-bottom). Para centralizar um bloco: <code>mx-auto</code>.</p>

      <div class="row g-4">
        <div class="col-md-6">
          <div class="card mb-4 shadow-sm">
            <div class="card-header bg-body-tertiary fw-bold">Escala</div>
            <div class="card-body">
              <table class="table table-borderless mb-0">
                <thead><tr><th>Classe</th><th>Valor</th><th>Exemplo</th></tr></thead>
                <tbody>
                  <tr><td><code>*-0</code></td><td>0</td><td>m-0, p-0</td></tr>
                  <tr><td><code>*-1</code></td><td>0.25rem (4px)</td><td>m-1, p-1</td></tr>
                  <tr><td><code>*-2</code></td><td>0.5rem (8px)</td><td>m-2, p-2</td></tr>
                  <tr><td><code>*-3</code></td><td>1rem (16px)</td><td>m-3, p-3</td></tr>
                  <tr><td><code>*-4</code></td><td>1.5rem (24px)</td><td>m-4, p-4</td></tr>
                  <tr><td><code>*-5</code></td><td>3rem (48px)</td><td>m-5, p-5</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4 shadow-sm">
            <div class="card-header bg-body-tertiary fw-bold">Direções</div>
            <div class="card-body">
              <table class="table table-borderless mb-0">
                <thead><tr><th>Prefixo</th><th>Direção</th><th>Exemplo</th></tr></thead>
                <tbody>
                  <tr><td><code>t</code></td><td>Top</td><td>mt-3, pt-3</td></tr>
                  <tr><td><code>b</code></td><td>Bottom</td><td>mb-3, pb-3</td></tr>
                  <tr><td><code>s</code></td><td>Start (left)</td><td>ms-3, ps-3</td></tr>
                  <tr><td><code>e</code></td><td>End (right)</td><td>me-3, pe-3</td></tr>
                  <tr><td><code>x</code></td><td>Horizontal</td><td>mx-3, px-3</td></tr>
                  <tr><td><code>y</code></td><td>Vertical</td><td>my-3, py-3</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function paginaGrid() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Grid System</h2>
      <p class="lead text-muted mb-5">Sistema de grid mobile-first com flexbox: 12 colunas, seis breakpoints responsivos e classes pré-definidas do Bootstrap.</p>

      <p class="mb-4">O grid usa <strong>containers</strong>, <strong>rows</strong> e <strong>colunas</strong> para alinhar o conteúdo. As colunas têm <em>gutter</em> (espaçamento horizontal); você pode usar <code>.gx-*</code>, <code>.gy-*</code> ou <code>.g-*</code> para alterar. Breakpoints são baseados em <code>min-width</code> (ex.: <code>.col-sm-4</code> vale de sm em diante).</p>

      ${componenteComCodigo('Exemplo básico',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row">
            <div class="col"><div class="bg-primary text-white p-3 rounded">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded">Column</div></div>
          </div>
        </div>`,
        `<div class="container text-center">
  <div class="row">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
  </div>
</div>`,
        `import { Grid, Row, Col } from '@legalops/ui';

<Grid><Row>
  <Col>Column</Col>
  <Col>Column</Col>
  <Col>Column</Col>
</Row></Grid>`,
        'Três colunas de largura igual em todos os viewports.'
      )}

      <h3 class="h5 fw-bold mt-5 mb-3">Opções do grid</h3>
      <p class="text-muted small mb-3">Seis níveis de breakpoint: xs, sm, md, lg, xl, xxl. Cada um tem prefixo de classe e max-width de container.</p>
      <div class="card mb-4 shadow-sm">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">xs<br/><span class="fw-normal">&lt;576px</span></th>
                  <th scope="col">sm<br/><span class="fw-normal">≥576px</span></th>
                  <th scope="col">md<br/><span class="fw-normal">≥768px</span></th>
                  <th scope="col">lg<br/><span class="fw-normal">≥992px</span></th>
                  <th scope="col">xl<br/><span class="fw-normal">≥1200px</span></th>
                  <th scope="col">xxl<br/><span class="fw-normal">≥1400px</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="text-nowrap" scope="row">Container <code class="fw-normal">max-width</code></th>
                  <td>None (auto)</td>
                  <td>540px</td>
                  <td>720px</td>
                  <td>960px</td>
                  <td>1140px</td>
                  <td>1320px</td>
                </tr>
                <tr>
                  <th class="text-nowrap" scope="row">Prefix da classe</th>
                  <td><code>.col-</code></td>
                  <td><code>.col-sm-</code></td>
                  <td><code>.col-md-</code></td>
                  <td><code>.col-lg-</code></td>
                  <td><code>.col-xl-</code></td>
                  <td><code>.col-xxl-</code></td>
                </tr>
                <tr>
                  <th class="text-nowrap" scope="row">Nº de colunas</th>
                  <td colspan="6">12</td>
                </tr>
                <tr>
                  <th class="text-nowrap" scope="row">Gutter</th>
                  <td colspan="6">1.5rem (0.75rem à esquerda e direita)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h3 class="h5 fw-bold mt-5 mb-3">Auto-layout (colunas de largura igual)</h3>
      <p class="text-muted small mb-3">Use <code>.col</code> sem número para colunas iguais; o número de <code>.col</code> define quantas colunas existem na row.</p>
      ${componenteComCodigo('Largura igual — 2 e 3 colunas',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row mb-2">
            <div class="col"><div class="bg-primary text-white p-3 rounded">1 of 2</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded">2 of 2</div></div>
          </div>
          <div class="row">
            <div class="col"><div class="bg-secondary text-white p-3 rounded">1 of 3</div></div>
            <div class="col"><div class="bg-secondary text-white p-3 rounded">2 of 3</div></div>
            <div class="col"><div class="bg-secondary text-white p-3 rounded">3 of 3</div></div>
          </div>
        </div>`,
        `<div class="container text-center">
  <div class="row">
    <div class="col">1 of 2</div>
    <div class="col">2 of 2</div>
  </div>
  <div class="row">
    <div class="col">1 of 3</div>
    <div class="col">2 of 3</div>
    <div class="col">3 of 3</div>
  </div>
</div>`,
        `<Row><Col>1 of 2</Col><Col>2 of 2</Col></Row>
<Row><Col>1 of 3</Col><Col>2 of 3</Col><Col>3 of 3</Col></Row>`,
        ''
      )}

      <h4 class="h6 fw-bold mt-4 mb-2">Definir largura de uma coluna</h4>
      <p class="text-muted small mb-3">Uma coluna com <code>.col-6</code> ou <code>.col-5</code>; as irmãs sem número se ajustam ao espaço restante.</p>
      ${componenteComCodigo('Uma coluna mais larga',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row mb-2">
            <div class="col"><div class="bg-primary text-white p-3 rounded">1 of 3</div></div>
            <div class="col-6"><div class="bg-secondary text-white p-3 rounded">2 of 3 (wider)</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded">3 of 3</div></div>
          </div>
          <div class="row">
            <div class="col"><div class="bg-primary text-white p-3 rounded">1 of 3</div></div>
            <div class="col-5"><div class="bg-secondary text-white p-3 rounded">2 of 3 (wider)</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded">3 of 3</div></div>
          </div>
        </div>`,
        `<div class="container text-center">
  <div class="row">
    <div class="col">1 of 3</div>
    <div class="col-6">2 of 3 (wider)</div>
    <div class="col">3 of 3</div>
  </div>
  <div class="row">
    <div class="col">1 of 3</div>
    <div class="col-5">2 of 3 (wider)</div>
    <div class="col">3 of 3</div>
  </div>
</div>`,
        `<Row>
  <Col>1 of 3</Col>
  <Col size={6}>2 of 3 (wider)</Col>
  <Col>3 of 3</Col>
</Row>`,
        ''
      )}

      <h4 class="h6 fw-bold mt-4 mb-2">Largura variável (conteúdo)</h4>
      <p class="text-muted small mb-3">Use <code>.col-{breakpoint}-auto</code> para a coluna seguir a largura natural do conteúdo.</p>
      ${componenteComCodigo('col-md-auto',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row justify-content-md-center mb-2">
            <div class="col col-lg-2"><div class="bg-primary text-white p-3 rounded">1 of 3</div></div>
            <div class="col-md-auto"><div class="bg-secondary text-white p-3 rounded">Variable width content</div></div>
            <div class="col col-lg-2"><div class="bg-primary text-white p-3 rounded">3 of 3</div></div>
          </div>
          <div class="row">
            <div class="col"><div class="bg-primary text-white p-3 rounded">1 of 3</div></div>
            <div class="col-md-auto"><div class="bg-secondary text-white p-3 rounded">Variable width content</div></div>
            <div class="col col-lg-2"><div class="bg-primary text-white p-3 rounded">3 of 3</div></div>
          </div>
        </div>`,
        `<div class="container text-center">
  <div class="row justify-content-md-center">
    <div class="col col-lg-2">1 of 3</div>
    <div class="col-md-auto">Variable width content</div>
    <div class="col col-lg-2">3 of 3</div>
  </div>
  <div class="row">
    <div class="col">1 of 3</div>
    <div class="col-md-auto">Variable width content</div>
    <div class="col col-lg-2">3 of 3</div>
  </div>
</div>`,
        `Row com justify-content-md-center e Col com col-md-auto`,
        ''
      )}

      <h3 class="h5 fw-bold mt-5 mb-3">Classes responsivas</h3>

      <h4 class="h6 fw-bold mt-4 mb-2">Todos os breakpoints</h4>
      <p class="text-muted small mb-3"><code>.col</code> e <code>.col-*</code> valem para todos os tamanhos de tela.</p>
      ${componenteComCodigo('.col e .col-8 / .col-4',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row mb-2">
            <div class="col"><div class="bg-primary text-white p-3 rounded">col</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded">col</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded">col</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded">col</div></div>
          </div>
          <div class="row">
            <div class="col-8"><div class="bg-secondary text-white p-3 rounded">col-8</div></div>
            <div class="col-4"><div class="bg-secondary text-white p-3 rounded">col-4</div></div>
          </div>
        </div>`,
        `<div class="container text-center">
  <div class="row">
    <div class="col">col</div>
    <div class="col">col</div>
    <div class="col">col</div>
    <div class="col">col</div>
  </div>
  <div class="row">
    <div class="col-8">col-8</div>
    <div class="col-4">col-4</div>
  </div>
</div>`,
        `Colunas iguais com .col; depois .col-8 e .col-4`,
        ''
      )}

      <h4 class="h6 fw-bold mt-4 mb-2">Empilhado → horizontal</h4>
      <p class="text-muted small mb-3">Com <code>.col-sm-*</code>, no mobile fica empilhado; a partir de sm (≥576px) fica horizontal.</p>
      ${componenteComCodigo('.col-sm-8 e .col-sm-4 / .col-sm',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row mb-2">
            <div class="col-sm-8"><div class="bg-primary text-white p-3 rounded">col-sm-8</div></div>
            <div class="col-sm-4"><div class="bg-secondary text-white p-3 rounded">col-sm-4</div></div>
          </div>
          <div class="row">
            <div class="col-sm"><div class="bg-primary text-white p-3 rounded">col-sm</div></div>
            <div class="col-sm"><div class="bg-primary text-white p-3 rounded">col-sm</div></div>
            <div class="col-sm"><div class="bg-primary text-white p-3 rounded">col-sm</div></div>
          </div>
        </div>`,
        `<div class="container text-center">
  <div class="row">
    <div class="col-sm-8">col-sm-8</div>
    <div class="col-sm-4">col-sm-4</div>
  </div>
  <div class="row">
    <div class="col-sm">col-sm</div>
    <div class="col-sm">col-sm</div>
    <div class="col-sm">col-sm</div>
  </div>
</div>`,
        `Responsivo por breakpoint sm`,
        ''
      )}

      <h4 class="h6 fw-bold mt-4 mb-2">Mix and match</h4>
      <p class="text-muted small mb-3">Combine classes por breakpoint (ex.: <code>.col-6 .col-md-4</code>) para layouts diferentes em cada tamanho.</p>
      ${componenteComCodigo('Mix: col-md-8, col-6 col-md-4, col-6',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row mb-2">
            <div class="col-md-8"><div class="bg-primary text-white p-3 rounded">.col-md-8</div></div>
            <div class="col-6 col-md-4"><div class="bg-secondary text-white p-3 rounded">.col-6 .col-md-4</div></div>
          </div>
          <div class="row mb-2">
            <div class="col-6 col-md-4"><div class="bg-primary text-white p-3 rounded">.col-6 .col-md-4</div></div>
            <div class="col-6 col-md-4"><div class="bg-primary text-white p-3 rounded">.col-6 .col-md-4</div></div>
            <div class="col-6 col-md-4"><div class="bg-primary text-white p-3 rounded">.col-6 .col-md-4</div></div>
          </div>
          <div class="row">
            <div class="col-6"><div class="bg-secondary text-white p-3 rounded">.col-6</div></div>
            <div class="col-6"><div class="bg-secondary text-white p-3 rounded">.col-6</div></div>
          </div>
        </div>`,
        `<div class="container text-center">
  <div class="row">
    <div class="col-md-8">.col-md-8</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
  </div>
  <div class="row">
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
  </div>
  <div class="row">
    <div class="col-6">.col-6</div>
    <div class="col-6">.col-6</div>
  </div>
</div>`,
        `Combinação de col e col-md-*`,
        ''
      )}

      <h3 class="h5 fw-bold mt-5 mb-3">Row columns (.row-cols-*)</h3>
      <p class="text-muted small mb-3">Defina na <code>.row</code> quantas colunas terão os filhos: <code>.row-cols-2</code>, <code>.row-cols-3</code>, <code>.row-cols-4</code>, <code>.row-cols-auto</code>. Use também <code>.row-cols-1 .row-cols-sm-2 .row-cols-md-4</code> para responsivo.</p>
      ${componenteComCodigo('row-cols-2',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row row-cols-2">
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
          </div>
        </div>`,
        `<div class="container text-center">
  <div class="row row-cols-2">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
  </div>
</div>`,
        `Dois itens por linha`,
        ''
      )}
      ${componenteComCodigo('row-cols-3',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row row-cols-3">
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
          </div>
        </div>`,
        `<div class="row row-cols-3">
  <div class="col">Column</div>
  <div class="col">Column</div>
  <div class="col">Column</div>
  <div class="col">Column</div>
</div>`,
        `Três colunas por linha`,
        ''
      )}
      ${componenteComCodigo('row-cols-auto',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row row-cols-auto">
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
          </div>
        </div>`,
        `<div class="row row-cols-auto">
  <div class="col">Column</div>
  <div class="col">Column</div>
  <div class="col">Column</div>
  <div class="col">Column</div>
</div>`,
        `Largura natural das colunas`,
        ''
      )}
      ${componenteComCodigo('row-cols-4',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row row-cols-4">
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
          </div>
        </div>`,
        `<div class="row row-cols-4">
  <div class="col">Column</div>
  <div class="col">Column</div>
  <div class="col">Column</div>
  <div class="col">Column</div>
</div>`,
        `Quatro colunas por linha`,
        ''
      )}
      ${componenteComCodigo('row-cols-4 com uma col-6',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row row-cols-4">
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
            <div class="col-6"><div class="bg-secondary text-white p-3 rounded">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded mb-2">Column</div></div>
          </div>
        </div>`,
        `<div class="row row-cols-4">
  <div class="col">Column</div>
  <div class="col">Column</div>
  <div class="col-6">Column</div>
  <div class="col">Column</div>
</div>`,
        `Uma coluna ocupa 6; as outras seguem row-cols-4`,
        ''
      )}
      ${componenteComCodigo('row-cols responsivo (1 / sm-2 / md-4)',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            <div class="col"><div class="bg-primary text-white p-3 rounded">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded">Column</div></div>
            <div class="col"><div class="bg-primary text-white p-3 rounded">Column</div></div>
          </div>
        </div>`,
        `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
  <div class="col">Column</div>
  <div class="col">Column</div>
  <div class="col">Column</div>
  <div class="col">Column</div>
</div>`,
        `1 coluna no mobile, 2 em sm, 4 em md+`,
        ''
      )}

      <h3 class="h5 fw-bold mt-5 mb-3">Aninhamento (Nesting)</h3>
      <p class="text-muted small mb-3">Dentro de uma <code>.col-*</code>, adicione uma nova <code>.row</code> e novas <code>.col-*</code>; a soma das colunas internas pode ser 12 ou menos.</p>
      ${componenteComCodigo('Grid aninhado',
        `<div class="container border rounded p-3 bg-light text-center">
          <div class="row">
            <div class="col-sm-3"><div class="bg-primary text-white p-3 rounded">Level 1: .col-sm-3</div></div>
            <div class="col-sm-9">
              <div class="row">
                <div class="col-8 col-sm-6"><div class="bg-secondary text-white p-3 rounded">Level 2: .col-8 .col-sm-6</div></div>
                <div class="col-4 col-sm-6"><div class="bg-secondary text-white p-3 rounded">Level 2: .col-4 .col-sm-6</div></div>
              </div>
            </div>
          </div>
        </div>`,
        `<div class="container text-center">
  <div class="row">
    <div class="col-sm-3">Level 1: .col-sm-3</div>
    <div class="col-sm-9">
      <div class="row">
        <div class="col-8 col-sm-6">Level 2: .col-8 .col-sm-6</div>
        <div class="col-4 col-sm-6">Level 2: .col-4 .col-sm-6</div>
      </div>
    </div>
  </div>
</div>`,
        `Row dentro de col-sm-9 com col-8/col-4 (col-sm-6)`,
        ''
      )}
    </section>
  `;
}

function paginaBreakpoints() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Breakpoints</h2>
      <p class="lead text-muted mb-4">Referência rápida dos breakpoints do design system. Todos são baseados em <code>min-width</code> (mobile-first): a regra vale a partir da largura indicada.</p>

      <div class="card shadow-sm">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead class="table-light">
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Largura</th>
                  <th scope="col">Onde atua</th>
                  <th scope="col">Prefix da classe (grid)</th>
                  <th scope="col">Container <code>max-width</code></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>xs</strong></td>
                  <td>&lt; 576px</td>
                  <td>Sempre (base mobile)</td>
                  <td><code>.col-</code></td>
                  <td>—</td>
                </tr>
                <tr>
                  <td><strong>sm</strong></td>
                  <td>≥ 576px</td>
                  <td>De 576px em diante</td>
                  <td><code>.col-sm-</code></td>
                  <td>540px</td>
                </tr>
                <tr>
                  <td><strong>md</strong></td>
                  <td>≥ 768px</td>
                  <td>De 768px em diante</td>
                  <td><code>.col-md-</code></td>
                  <td>720px</td>
                </tr>
                <tr>
                  <td><strong>lg</strong></td>
                  <td>≥ 992px</td>
                  <td>De 992px em diante</td>
                  <td><code>.col-lg-</code></td>
                  <td>960px</td>
                </tr>
                <tr>
                  <td><strong>xl</strong></td>
                  <td>≥ 1200px</td>
                  <td>De 1200px em diante</td>
                  <td><code>.col-xl-</code></td>
                  <td>1140px</td>
                </tr>
                <tr>
                  <td><strong>xxl</strong></td>
                  <td>≥ 1400px</td>
                  <td>De 1400px em diante</td>
                  <td><code>.col-xxl-</code></td>
                  <td>1320px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p class="mt-3 small text-muted">Utilitários de display, flex, margin, padding etc. seguem os mesmos prefixos: <code>d-sm-none</code>, <code>d-md-block</code>, <code>px-lg-3</code>, etc.</p>
    </section>
  `;
}

function paginaContainers() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Containers</h2>
      <p class="lead text-muted mb-4">Containers centralizam e limitam a largura do conteúdo em cada tamanho de tela. Use quando quiser que o layout não fique colado nas bordas em monitores grandes.</p>
      <p class="mb-4 text-muted small">O <code>.container</code> tem largura máxima por breakpoint. O <code>.container-fluid</code> ocupa 100% da largura em todos. Os responsivos (<code>.container-sm</code>, <code>.container-md</code>, etc.) ficam 100% até o breakpoint e depois ganham o mesmo max-width do container padrão.</p>

      ${componenteComCodigo('Container padrão',
        `<div class="container border rounded p-3 bg-light text-center">
          <p class="mb-0">Conteúdo dentro de <code>.container</code> — largura máxima muda em cada breakpoint.</p>
        </div>`,
        `<div class="container">
  <!-- seu conteúdo -->
</div>`,
        `Container centraliza e limita a largura`,
        ''
      )}

      ${componenteComCodigo('Container fluido',
        `<div class="container-fluid border rounded p-3 bg-light text-center">
          <p class="mb-0">Conteúdo em <code>.container-fluid</code> — 100% da largura em qualquer tela.</p>
        </div>`,
        `<div class="container-fluid">
  <!-- 100% da largura -->
</div>`,
        `Útil para layouts full-width`,
        ''
      )}

      <div class="card mb-4 shadow-sm">
        <div class="card-header bg-body-tertiary fw-bold">Largura máxima por breakpoint</div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead><tr><th>Classe</th><th>xs &lt;576px</th><th>sm ≥576px</th><th>md ≥768px</th><th>lg ≥992px</th><th>xl ≥1200px</th><th>xxl ≥1400px</th></tr></thead>
              <tbody>
                <tr><td><code>.container</code></td><td>100%</td><td>540px</td><td>720px</td><td>960px</td><td>1140px</td><td>1320px</td></tr>
                <tr><td><code>.container-sm</code></td><td>100%</td><td>540px</td><td>720px</td><td>960px</td><td>1140px</td><td>1320px</td></tr>
                <tr><td><code>.container-md</code></td><td>100%</td><td>100%</td><td>720px</td><td>960px</td><td>1140px</td><td>1320px</td></tr>
                <tr><td><code>.container-lg</code></td><td>100%</td><td>100%</td><td>100%</td><td>960px</td><td>1140px</td><td>1320px</td></tr>
                <tr><td><code>.container-xl</code></td><td>100%</td><td>100%</td><td>100%</td><td>100%</td><td>1140px</td><td>1320px</td></tr>
                <tr><td><code>.container-xxl</code></td><td>100%</td><td>100%</td><td>100%</td><td>100%</td><td>100%</td><td>1320px</td></tr>
                <tr><td><code>.container-fluid</code></td><td colspan="6">100% em todos</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `;
}

function paginaGutters() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Gutters</h2>
      <p class="lead text-muted mb-4">Gutters são o espaço entre as colunas do grid. Por padrão já existe um espaçamento; você pode aumentar, diminuir ou remover com classes na <code>.row</code>.</p>
      <p class="mb-4 text-muted small">Use <code>.gx-*</code> para espaço horizontal entre colunas, <code>.gy-*</code> para vertical (quando as colunas quebram linha) e <code>.g-*</code> para os dois. Use <code>.g-0</code> para remover os gutters.</p>

      ${componenteComCodigo('Gutter horizontal maior (.gx-5)',
        `<div class="container overflow-hidden text-center">
          <div class="row gx-5">
            <div class="col"><div class="p-3 bg-primary bg-opacity-25 rounded">Coluna 1</div></div>
            <div class="col"><div class="p-3 bg-primary bg-opacity-25 rounded">Coluna 2</div></div>
          </div>
        </div>`,
        `<div class="container overflow-hidden">
  <div class="row gx-5">
    <div class="col">...</div>
    <div class="col">...</div>
  </div>
</div>`,
        `Mais espaço entre colunas`,
        ''
      )}

      ${componenteComCodigo('Gutter vertical (.gy-4)',
        `<div class="container overflow-hidden text-center">
          <div class="row gy-4">
            <div class="col-6"><div class="p-3 bg-secondary bg-opacity-25 rounded">A</div></div>
            <div class="col-6"><div class="p-3 bg-secondary bg-opacity-25 rounded">B</div></div>
            <div class="col-6"><div class="p-3 bg-secondary bg-opacity-25 rounded">C</div></div>
            <div class="col-6"><div class="p-3 bg-secondary bg-opacity-25 rounded">D</div></div>
          </div>
        </div>`,
        `<div class="row gy-4">
  <div class="col-6">...</div>
  <div class="col-6">...</div>
</div>`,
        `Espaço entre linhas quando as colunas quebram`,
        ''
      )}

      ${componenteComCodigo('Gutter único menor (.g-2)',
        `<div class="container text-center">
          <div class="row g-2">
            <div class="col-6"><div class="p-3 bg-primary bg-opacity-25 rounded">1</div></div>
            <div class="col-6"><div class="p-3 bg-primary bg-opacity-25 rounded">2</div></div>
            <div class="col-6"><div class="p-3 bg-primary bg-opacity-25 rounded">3</div></div>
            <div class="col-6"><div class="p-3 bg-primary bg-opacity-25 rounded">4</div></div>
          </div>
        </div>`,
        `<div class="row g-2">
  <div class="col-6">...</div>
  <div class="col-6">...</div>
</div>`,
        `Espaço uniforme horizontal e vertical (escala 0–5)`,
        ''
      )}

      ${componenteComCodigo('Sem gutter (.g-0)',
        `<div class="container text-center">
          <div class="row g-0">
            <div class="col-6"><div class="p-2 border">col</div></div>
            <div class="col-6"><div class="p-2 border">col</div></div>
          </div>
        </div>`,
        `<div class="row g-0">
  <div class="col-6">...</div>
  <div class="col-6">...</div>
</div>`,
        `Colunas coladas, sem espaço entre elas`,
        ''
      )}
    </section>
  `;
}

function paginaBotoes() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Botões</h2>
      <p class="lead text-muted mb-4">Use para ações principais (primário), secundárias (outline) e tamanhos diferentes. Mantenha um único botão primário por contexto para guiar o usuário.</p>

      ${componenteComCodigo('Botões Sólidos',
        `<div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary">Primário</button>
          <button class="btn btn-secondary">Secundário</button>
          <button class="btn btn-tertiary text-white">Terciário</button>
        </div>`,
        `<button class="btn btn-primary">Primário</button>
<button class="btn btn-secondary">Secundário</button>
<button class="btn btn-tertiary">Terciário</button>`,
        `<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="tertiary">Terciário</Button>`,
        'Primária (#E5293F) | Secundária (#ACBAC2) | Terciária (#7F919A)'
      )}

      ${componenteComCodigo('Botões Outline',
        `<div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-primary">Outline Primário</button>
          <button class="btn btn-outline-secondary">Outline Secundário</button>
          <button class="btn btn-outline-tertiary">Outline Terciário</button>
        </div>`,
        `<button class="btn btn-outline-primary">Outline Primário</button>
<button class="btn btn-outline-secondary">Outline Secundário</button>
<button class="btn btn-outline-tertiary">Outline Terciário</button>`,
        `<Button variant="outline-primary">Outline Primário</Button>
<Button variant="outline-secondary">Outline Secundário</Button>
<Button variant="outline-tertiary">Outline Terciário</Button>`,
        ''
      )}

      ${componenteComCodigo('Tamanhos',
        `<div class="d-flex gap-2 align-items-center flex-wrap">
          <button class="btn btn-primary btn-sm">Pequeno</button>
          <button class="btn btn-primary">Normal</button>
          <button class="btn btn-primary btn-lg">Grande</button>
        </div>`,
        `<button class="btn btn-primary btn-sm">Pequeno</button>
<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary btn-lg">Grande</button>`,
        `<Button size="sm">Pequeno</Button>
<Button>Normal</Button>
<Button size="lg">Grande</Button>`,
        'btn-sm | padrão | btn-lg'
      )}

      ${componenteComCodigo('Grupo de botões',
        `<div class="btn-group" role="group">
          <button type="button" class="btn btn-outline-primary">Esquerda</button>
          <button type="button" class="btn btn-outline-primary active">Centro</button>
          <button type="button" class="btn btn-outline-primary">Direita</button>
        </div>
        <div class="btn-group mt-2" role="group">
          <button type="button" class="btn btn-primary">1</button>
          <button type="button" class="btn btn-primary">2</button>
          <button type="button" class="btn btn-primary">3</button>
        </div>`,
        `<div class="btn-group" role="group">
  <button class="btn btn-outline-primary">A</button>
  <button class="btn btn-outline-primary">B</button>
</div>`,
        `btn-group agrupa botões lado a lado`,
        ''
      )}

      ${componenteComCodigo('Estados',
        `<div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-primary">Normal</button>
          <button class="btn btn-primary active">Ativo</button>
          <button class="btn btn-primary" disabled>Desabilitado</button>
        </div>`,
        `<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary" disabled>Desabilitado</button>`,
        `<Button>Normal</Button>
<Button disabled>Desabilitado</Button>`,
        ''
      )}
    </section>
  `;
}

function paginaBadges() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Badges</h2>
      <p class="lead text-muted mb-4">Labels curtos para status (Ativo, Pendente), contadores ao lado de ícones ou categorias. Use as cores do sistema para manter o significado consistente.</p>

      ${componenteComCodigo('Badges Sólidos',
        `<div class="d-flex gap-2 flex-wrap">
          <span class="badge bg-primary">Primário</span>
          <span class="badge bg-secondary">Secundário</span>
          <span class="badge bg-tertiary">Terciário</span>
        </div>`,
        `<span class="badge bg-primary">Primário</span>
<span class="badge bg-secondary">Secundário</span>
<span class="badge bg-tertiary">Terciário</span>`,
        `<Badge variant="primary">Primário</Badge>
<Badge variant="secondary">Secundário</Badge>
<Badge variant="tertiary">Terciário</Badge>`,
        ''
      )}

      ${componenteComCodigo('Badge Pill',
        `<div class="d-flex gap-2 flex-wrap">
          <span class="badge rounded-pill bg-primary">Pill Primário</span>
          <span class="badge rounded-pill bg-secondary">Pill Secundário</span>
          <span class="badge rounded-pill bg-tertiary">Pill Terciário</span>
        </div>`,
        `<span class="badge rounded-pill bg-primary">Pill Primário</span>`,
        `<Badge pill variant="primary">Pill Primário</Badge>`,
        ''
      )}
    </section>
  `;
}

function paginaAlertas() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Alertas</h2>
      <p class="lead text-muted mb-4">Caixas de destaque para avisos, sucesso, erro ou informação. Podem ter botão de fechar (dismiss) e ícone. Evite abusar — uma mensagem clara por contexto.</p>

      ${componenteComCodigo('Alertas do Design System',
        `<div class="alert alert-primary" role="alert">Alerta primário — usando a cor principal do EasyJur.</div>
         <div class="alert alert-secondary" role="alert">Alerta secundário — informação neutra.</div>
         <div class="alert alert-tertiary" role="alert">Alerta terciário — destaque sutil.</div>`,
        `<div class="alert alert-primary" role="alert">Alerta primário</div>
<div class="alert alert-secondary" role="alert">Alerta secundário</div>
<div class="alert alert-tertiary" role="alert">Alerta terciário</div>`,
        `import { Alert } from '@legalops/ui';

<Alert variant="primary">Alerta primário</Alert>`,
        ''
      )}

      ${componenteComCodigo('Alerta com Ícone e Dismiss',
        `<div class="alert alert-primary alert-dismissible fade show d-flex align-items-center" role="alert">
          <i class="bi bi-info-circle-fill me-2"></i>
          <div>
            Alerta com ícone e botão de fechar.
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`,
        `<div class="alert alert-primary alert-dismissible fade show" role="alert">
  Alerta que pode ser fechado.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>`,
        `<Alert variant="primary" dismissible>Alerta...</Alert>`,
        ''
      )}
    </section>
  `;
}

function paginaCards() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Cards</h2>
      <p class="lead text-muted mb-4">Blocos com título, texto, imagens e botões. Ideais para listagens, resumos e agrupamento de informação. Use card-header e card-footer quando precisar de cabeçalho ou rodapé fixos.</p>

      ${componenteComCodigo('Card Básico',
        `<div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Título do Card</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Subtítulo</h6>
            <p class="card-text">Conteúdo do card com informações relevantes.</p>
            <a href="#" class="card-link">Link 1</a>
            <a href="#" class="card-link">Link 2</a>
          </div>
        </div>`,
        `<div class="card">
  <div class="card-body">
    <h5 class="card-title">Título</h5>
    <p class="card-text">Conteúdo.</p>
    <a href="#" class="btn btn-primary">Ação</a>
  </div>
</div>`,
        `<Card>
  <Card.Body>
    <Card.Title>Título</Card.Title>
    <Card.Text>Conteúdo.</Card.Text>
  </Card.Body>
</Card>`,
        ''
      )}

      ${componenteComCodigo('Card com Header e Footer',
        `<div class="card text-center" style="width: 18rem;">
          <div class="card-header">Destaque</div>
          <div class="card-body">
            <h5 class="card-title">Tratamento Especial</h5>
            <p class="card-text">Conteúdo com header e footer.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
          <div class="card-footer text-body-secondary">2 dias atrás</div>
        </div>`,
        `<div class="card">
  <div class="card-header">Header</div>
  <div class="card-body">...</div>
  <div class="card-footer">Footer</div>
</div>`,
        `<Card>
  <Card.Header>Header</Card.Header>
  <Card.Body>...</Card.Body>
</Card>`,
        ''
      )}
    </section>
  `;
}

function paginaAccordion() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Accordion</h2>
      <p class="lead text-muted mb-5">Painéis expansíveis para organizar conteúdo.</p>

      ${componenteComCodigo('Accordion Básico',
        `<div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                Item #1
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div class="accordion-body">Conteúdo do primeiro item.</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                Item #2
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">Conteúdo do segundo item.</div>
            </div>
          </div>
        </div>`,
        `<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#c1">
        Item 1
      </button>
    </h2>
    <div id="c1" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">Conteúdo...</div>
    </div>
  </div>
</div>`,
        `import { Accordion } from '@legalops/ui';

<Accordion>
  <Accordion.Item title="Item 1">Conteúdo...</Accordion.Item>
</Accordion>`,
        ''
      )}
    </section>
  `;
}

function paginaModais() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Modais</h2>
      <p class="lead text-muted mb-5">Diálogos modais para interações focadas.</p>

      ${componenteComCodigo('Modal Básico',
        `<div>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Abrir Modal
          </button>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Título do Modal</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Corpo do modal com texto e informações.
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                  <button type="button" class="btn btn-primary">Salvar</button>
                </div>
              </div>
            </div>
          </div>
        </div>`,
        `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal1">Abrir</button>

<div class="modal fade" id="modal1" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Título</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">Conteúdo...</div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>`,
        `import { Modal } from '@legalops/ui';

<Modal isOpen={isOpen} onClose={close}>
  <Modal.Header>Título</Modal.Header>
  <Modal.Body>Conteúdo...</Modal.Body>
</Modal>`,
        'Clique no botão para abrir o modal.'
      )}
    </section>
  `;
}

function paginaTooltips() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Tooltips e Popovers</h2>
      <p class="lead text-muted mb-5">Dicas contextuais flutuantes.</p>

      ${componenteComCodigo('Tooltips',
        `<div class="d-flex gap-2 flex-wrap py-3">
          <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip no topo">
            Tooltip Topo
          </button>
          <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Tooltip na direita">
            Tooltip Direita
          </button>
          <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip embaixo">
            Tooltip Baixo
          </button>
          <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Tooltip na esquerda">
            Tooltip Esquerda
          </button>
        </div>`,
        `<button data-bs-toggle="tooltip" data-bs-title="Texto">Hover</button>`,
        `<Tooltip content="Texto"><Button>Hover</Button></Tooltip>`,
        'Requer inicialização via JS (new bootstrap.Tooltip)'
      )}
    </section>
  `;
}

function paginaProgress() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Progress</h2>
      <p class="lead text-muted mb-5">Barras de progresso customizadas.</p>

      ${componenteComCodigo('Barras de Progresso',
        `<div class="d-flex flex-column gap-3">
          <div class="progress" role="progressbar">
            <div class="progress-bar bg-primary" style="width: 25%">25%</div>
          </div>
          <div class="progress" role="progressbar">
            <div class="progress-bar bg-secondary" style="width: 50%">50%</div>
          </div>
          <div class="progress" role="progressbar">
            <div class="progress-bar bg-tertiary" style="width: 75%">75%</div>
          </div>
        </div>`,
        `<div class="progress">
  <div class="progress-bar bg-primary" style="width: 25%"></div>
</div>`,
        `<Progress value={25} variant="primary" />`,
        ''
      )}
    </section>
  `;
}

function paginaSpinners() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Spinners</h2>
      <p class="lead text-muted mb-5">Indicadores de carregamento.</p>

      ${componenteComCodigo('Spinners Coloridos',
        `<div class="d-flex gap-3">
          <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
          <div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>
          <div class="spinner-border text-tertiary" role="status"><span class="visually-hidden">Loading...</span></div>
        </div>`,
        `<div class="spinner-border text-primary"></div>
<div class="spinner-border text-secondary"></div>
<div class="spinner-border text-tertiary"></div>`,
        `<Spinner variant="primary" />`,
        ''
      )}
    </section>
  `;
}

function paginaToasts() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Toasts</h2>
      <p class="lead text-muted mb-5">Notificações estilo push.</p>

      ${componenteComCodigo('Toast Estático',
        `<div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <div class="rounded me-2 bg-primary" style="width: 20px; height: 20px;"></div>
            <strong class="me-auto">EasyJur</strong>
            <small>11 mins ago</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Olá! Esta é uma notificação toast.
          </div>
        </div>`,
        `<div class="toast show">
  <div class="toast-header">
    <strong class="me-auto">Título</strong>
    <button class="btn-close"></button>
  </div>
  <div class="toast-body">Mensagem...</div>
</div>`,
        `const { showToast } = useToast();
showToast({ title: 'Título', message: '...' })`,
        ''
      )}
    </section>
  `;
}

function paginaInputs() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Inputs</h2>
      <p class="lead text-muted mb-4">Campos de texto, e-mail, senha e textarea com <code>.form-control</code>. Sempre use <code>.form-label</code> nas labels e associe com <code>for</code> e <code>id</code> para acessibilidade.</p>

      ${componenteComCodigo('Campos de Texto',
        `<div class="row g-3">
          <div class="col-12">
            <label class="form-label">Email address</label>
            <input type="email" class="form-control" placeholder="name@example.com">
          </div>
          <div class="col-12">
            <label class="form-label">Textarea</label>
            <textarea class="form-control" rows="3"></textarea>
          </div>
        </div>`,
        `<label class="form-label">Email</label>
<input type="email" class="form-control" placeholder="name@example.com">`,
        `<Input label="Email" placeholder="..." />`,
        ''
      )}
    </section>
  `;
}

function paginaSelects() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Selects</h2>
      <p class="lead text-muted mb-4">Lista de opções com <code>.form-select</code>. Use para escolha única (país, estado, categoria). Para muitas opções ou busca, considere um componente de autocomplete.</p>

      ${componenteComCodigo('Form Select',
        `<select class="form-select" aria-label="Default select example">
          <option selected>Abra o menu de seleção</option>
          <option value="1">Opção Um</option>
          <option value="2">Opção Dois</option>
          <option value="3">Opção Três</option>
        </select>`,
        `<select class="form-select">
  <option>Opção 1</option>
</select>`,
        `<Select options={[{label: 'Opção 1', value: 1}]} />`,
        ''
      )}
    </section>
  `;
}

function paginaCheckboxes() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Checkboxes e Radios</h2>
      <p class="lead text-muted mb-5">Seleção múltipla e única.</p>

      ${componenteComCodigo('Checkbox',
        `<div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">Checkbox padrão</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
            <label class="form-check-label" for="flexCheckChecked">Checkbox marcado</label>
          </div>
        </div>`,
        `<div class="form-check">
  <input class="form-check-input" type="checkbox" id="c1">
  <label class="form-check-label" for="c1">Label</label>
</div>`,
        `<Checkbox label="Label" />`,
        ''
      )}
    </section>
  `;
}

function paginaSwitches() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Switches</h2>
      <p class="lead text-muted mb-5">Interruptores toggle.</p>

      ${componenteComCodigo('Switch',
        `<div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">Switch padrão</label>
        </div>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
          <label class="form-check-label" for="flexSwitchCheckChecked">Switch ativado</label>
        </div>`,
        `<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch">
  <label class="form-check-label">Switch</label>
</div>`,
        `<Switch label="Switch" />`,
        ''
      )}
    </section>
  `;
}

function paginaInputGroup() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Input Group</h2>
      <p class="lead text-muted mb-5">Agrupamento de inputs e botões.</p>

      ${componenteComCodigo('Input Group',
        `<div class="input-group mb-3">
          <span class="input-group-text">@</span>
          <input type="text" class="form-control" placeholder="Username">
        </div>
        <div class="input-group">
          <span class="input-group-text">R$</span>
          <input type="text" class="form-control">
          <span class="input-group-text">,00</span>
        </div>`,
        `<div class="input-group">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control">
</div>`,
        `<InputGroup prefix="@">
  <Input />
</InputGroup>`,
        ''
      )}
    </section>
  `;
}

function paginaFormLayout() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Layout de formulário</h2>
      <p class="lead text-muted mb-4">Formulários podem ser organizados em colunas com o grid. Use <code>.row</code> e <code>.col-*</code> para campos lado a lado e <code>.g-3</code> para um espaçamento confortável entre os grupos.</p>
      <p class="mb-4 text-muted small">Em telas pequenas os campos ficam empilhados; a partir do breakpoint (ex.: <code>md</code>) eles passam a ocupar a largura definida. Labels alinhados à esquerda dos campos usam <code>.col-form-label</code> na label.</p>

      ${componenteComCodigo('Formulário em grid (row g-3)',
        `<form class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nome</label>
            <input type="text" class="form-control" placeholder="Nome">
          </div>
          <div class="col-md-6">
            <label class="form-label">Sobrenome</label>
            <input type="text" class="form-control" placeholder="Sobrenome">
          </div>
          <div class="col-12">
            <label class="form-label">Endereço</label>
            <input type="text" class="form-control" placeholder="Rua, número">
          </div>
          <div class="col-md-6">
            <label class="form-label">Cidade</label>
            <input type="text" class="form-control" placeholder="Cidade">
          </div>
          <div class="col-md-4">
            <label class="form-label">Estado</label>
            <select class="form-select"><option>Selecione...</option></select>
          </div>
          <div class="col-md-2">
            <label class="form-label">CEP</label>
            <input type="text" class="form-control" placeholder="CEP">
          </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="check1">
              <label class="form-check-label" for="check1">Aceito os termos</label>
            </div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Enviar</button>
          </div>
        </form>`,
        `<form class="row g-3">
  <div class="col-md-6">
    <label class="form-label">Nome</label>
    <input type="text" class="form-control">
  </div>
  <div class="col-md-6">
    <label class="form-label">Sobrenome</label>
    <input type="text" class="form-control">
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Enviar</button>
  </div>
</form>`,
        `Grid + form-label + form-control + form-select`,
        ''
      )}

      ${componenteComCodigo('Formulário horizontal (label ao lado do campo)',
        `<form>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" placeholder="email@exemplo.com">
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Senha</label>
            <div class="col-sm-10">
              <input type="password" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-10 offset-sm-2">
              <button type="submit" class="btn btn-primary">Entrar</button>
            </div>
          </div>
        </form>`,
        `<form>
  <div class="row mb-3">
    <label class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control">
    </div>
  </div>
  <div class="row">
    <div class="col-sm-10 offset-sm-2">
      <button type="submit" class="btn btn-primary">Entrar</button>
    </div>
  </div>
</form>`,
        `Labels e campos na mesma linha em telas sm ou maior`,
        ''
      )}
    </section>
  `;
}

function paginaValidacao() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Validação de formulário</h2>
      <p class="lead text-muted mb-4">Mostre feedback visual quando um campo está válido ou inválido. Use <code>.valid-feedback</code> e <code>.invalid-feedback</code> para as mensagens; o campo recebe <code>.is-valid</code> ou <code>.is-invalid</code> (ou a validação nativa do HTML5 com a classe <code>.was-validated</code> no form).</p>
      <p class="mb-4 text-muted small">Aqui os exemplos estão com estado fixo para você ver o resultado. No uso real, essas classes são aplicadas após o usuário enviar o formulário ou ao sair do campo, via JavaScript ou validação no servidor.</p>

      ${componenteComCodigo('Campo válido e inválido (estado visual)',
        `<div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Campo válido</label>
            <input type="text" class="form-control is-valid" value="Texto correto">
            <div class="valid-feedback">Parece bom!</div>
          </div>
          <div class="col-md-6">
            <label class="form-label">Campo inválido</label>
            <input type="text" class="form-control is-invalid" value="" placeholder="Obrigatório">
            <div class="invalid-feedback">Preencha este campo.</div>
          </div>
          <div class="col-12">
            <label class="form-label">Select inválido</label>
            <select class="form-select is-invalid">
              <option value="">Escolha...</option>
              <option>Opção 1</option>
            </select>
            <div class="invalid-feedback">Selecione uma opção.</div>
          </div>
        </div>`,
        `<input type="text" class="form-control is-valid" value="Ok">
<div class="valid-feedback">Parece bom!</div>

<input type="text" class="form-control is-invalid">
<div class="invalid-feedback">Preencha este campo.</div>`,
        `Use is-valid / is-invalid nos controles e valid-feedback / invalid-feedback para o texto`,
        ''
      )}

      ${componenteComCodigo('Checkbox com feedback inválido',
        `<div class="form-check">
          <input class="form-check-input is-invalid" type="checkbox" id="valCheck">
          <label class="form-check-label" for="valCheck">Aceito os termos e condições</label>
          <div class="invalid-feedback">Você precisa concordar para continuar.</div>
        </div>`,
        `<div class="form-check">
  <input class="form-check-input is-invalid" type="checkbox" id="c1">
  <label class="form-check-label" for="c1">Aceito os termos</label>
  <div class="invalid-feedback">Você precisa concordar.</div>
</div>`,
        `Checkbox e radio também suportam valid-feedback e invalid-feedback`,
        ''
      )}
    </section>
  `;
}

function paginaNavbar() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Navbar</h2>
      <p class="lead text-muted mb-4">Barra de navegação no topo da página. Responsiva: em telas pequenas o menu vira um botão (hamburger) que abre o restante dos links.</p>

      ${componenteComCodigo('Navbar Primary',
        `<nav class="navbar navbar-expand-lg bg-primary navbar-dark rounded">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">EasyJur</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav1">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nav1">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Features</a></li>
              </ul>
            </div>
          </div>
        </nav>`,
        `<nav class="navbar bg-primary navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
  </div>
</nav>`,
        `<Navbar brand="Logo" variant="primary" />`,
        ''
      )}
    </section>
  `;
}

function paginaBreadcrumb() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Breadcrumb</h2>
      <p class="lead text-muted mb-4">Caminho da página atual (ex.: Home > Produtos > Detalhe). Ajuda o usuário a saber onde está e voltar níveis. Use <code>aria-current="page"</code> no item atual.</p>

      ${componenteComCodigo('Breadcrumb',
        `<nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Library</a></li>
            <li class="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>`,
        `<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item active">Data</li>
  </ol>
</nav>`,
        `<Breadcrumb items={['Home', 'Data']} />`,
        ''
      )}
    </section>
  `;
}

function paginaTabs() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Tabs e Pills</h2>
      <p class="lead text-muted mb-4">Abas para alternar conteúdo na mesma página. Use <code>nav-tabs</code> para o estilo com borda embaixo ou <code>nav-pills</code> para o estilo “pill” (com fundo quando ativo).</p>

      ${componenteComCodigo('Nav Tabs',
        `<ul class="nav nav-tabs mb-3">
          <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
          <li class="nav-item"><a class="nav-link disabled">Disabled</a></li>
        </ul>`,
        `<ul class="nav nav-tabs">
  <li class="nav-item"><a class="nav-link active">Active</a></li>
</ul>`,
        `<Tabs>
  <Tab title="Active">...</Tab>
</Tabs>`,
        ''
      )}

      ${componenteComCodigo('Nav Pills',
        `<ul class="nav nav-pills">
          <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Outro</a></li>
        </ul>`,
        `<ul class="nav nav-pills">
  <li class="nav-item"><a class="nav-link active">Active</a></li>
  <li class="nav-item"><a class="nav-link">Link</a></li>
</ul>`,
        `nav-pills para estilo pill`,
        ''
      )}
    </section>
  `;
}

function paginaPagination() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Pagination</h2>
      <p class="lead text-muted mb-4">Navegação entre páginas de resultados. Use <code>page-item</code> e <code>page-link</code>; <code>active</code> e <code>disabled</code> para o estado atual e botões desativados.</p>

      ${componenteComCodigo('Pagination',
        `<nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item disabled"><a class="page-link">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>`,
        `<ul class="pagination">
  <li class="page-item"><a class="page-link">1</a></li>
</ul>`,
        `<Pagination total={10} current={2} />`,
        ''
      )}
    </section>
  `;
}

function paginaDropdown() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Dropdowns</h2>
      <p class="lead text-muted mb-4">Menu que abre ao clicar no botão — ações secundárias, opções de ordenação ou “mais opções”. Requer JavaScript do Bootstrap para abrir/fechar.</p>

      ${componenteComCodigo('Dropdown Button',
        `<div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown button
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>`,
        `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
    Dropdown
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item">Action</a></li>
  </ul>
</div>`,
        `<Dropdown title="Dropdown">
  <Dropdown.Item>Action</Dropdown.Item>
</Dropdown>`,
        ''
      )}
    </section>
  `;
}

function paginaTabelas() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Tabelas</h2>
      <p class="lead text-muted mb-4">Exiba dados em linhas e colunas com a classe base <code>.table</code>. Adicione <code>table-striped</code>, <code>table-bordered</code>, <code>table-hover</code> ou <code>table-sm</code> para variar o visual.</p>
      <p class="mb-4 text-muted small">Em mobile, envolva a tabela em <code>&lt;div class="table-responsive"&gt;</code> para permitir rolagem horizontal quando necessário.</p>

      ${componenteComCodigo('Tabela listrada e hover',
        `<table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Sobrenome</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr><th scope="row">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr>
            <tr><th scope="row">2</th><td>Jacob</td><td>Thornton</td><td>@fat</td></tr>
            <tr><th scope="row">3</th><td>Larry</td><td>the Bird</td><td>@twitter</td></tr>
          </tbody>
        </table>`,
        `<table class="table table-striped table-hover">
  <thead>...</thead>
  <tbody>...</tbody>
</table>`,
        `table-striped alterna cor das linhas; table-hover destaca a linha ao passar o mouse`,
        ''
      )}

      ${componenteComCodigo('Tabela com bordas e compacta',
        `<table class="table table-bordered table-sm">
          <thead class="table-light">
            <tr><th scope="col">#</th><th scope="col">Campo</th><th scope="col">Valor</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">1</th><td>Nome</td><td>Exemplo</td></tr>
            <tr><th scope="row">2</th><td>Status</td><td>Ativo</td></tr>
          </tbody>
        </table>`,
        `<table class="table table-bordered table-sm">
  <thead class="table-light">...</thead>
  <tbody>...</tbody>
</table>`,
        `table-bordered desenha bordas; table-sm reduz o padding das células`,
        ''
      )}

      ${componenteComCodigo('Tabela responsiva',
        `<div class="table-responsive">
          <table class="table">
            <thead><tr><th>#</th><th>Coluna A</th><th>Coluna B</th><th>Coluna C</th><th>Coluna D</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Cel</td><td>Cel</td><td>Cel</td><td>Cel</td></tr>
            </tbody>
          </table>
        </div>`,
        `<div class="table-responsive">
  <table class="table">...</table>
</div>`,
        `Em telas estreitas a tabela ganha scroll horizontal`,
        ''
      )}
    </section>
  `;
}

function paginaListGroup() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">List Group</h2>
      <p class="lead text-muted mb-4">Listas com itens em bloco — ideal para menus laterais, resultados de busca ou qualquer lista em que cada item precise de destaque. Itens podem ser links, com badge ou ativo.</p>

      ${componenteComCodigo('Lista simples e ativo',
        `<ul class="list-group" style="max-width: 400px;">
          <li class="list-group-item active" aria-current="true">Item ativo</li>
          <li class="list-group-item">Segundo item</li>
          <li class="list-group-item">Terceiro item</li>
        </ul>`,
        `<ul class="list-group">
  <li class="list-group-item active">Ativo</li>
  <li class="list-group-item">Item</li>
</ul>`,
        `list-group-item e list-group-item active`,
        ''
      )}

      ${componenteComCodigo('Lista com badges e links',
        `<div class="list-group" style="max-width: 400px;">
          <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            Item clicável <span class="badge bg-primary rounded-pill">12</span>
          </a>
          <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            Outro item <span class="badge bg-secondary rounded-pill">3</span>
          </a>
        </div>`,
        `<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between">
    Título <span class="badge bg-primary rounded-pill">1</span>
  </a>
</div>`,
        `list-group-item-action para links; badge para contadores`,
        ''
      )}
    </section>
  `;
}

function paginaHelpers() {
  return `
    <section class="mb-5">
      <h2 class="display-6 fw-bold text-primary mb-3">Utilitários e helpers</h2>
      <p class="lead text-muted mb-4">Classes de uso diário para alinhar, mostrar/ocultar, dar bordas, truncar texto e muito mais. Tudo responsivo quando fizer sentido.</p>

      <h3 class="h5 fw-bold mt-4 mb-3">Cores de texto e fundo</h3>
      <div class="row g-4 mb-4">
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-header bg-body-tertiary fw-bold small">Texto</div>
            <div class="card-body">
              <p class="text-primary mb-1">.text-primary</p>
              <p class="text-secondary mb-1">.text-secondary</p>
              <p class="text-success mb-1">.text-success</p>
              <p class="text-danger mb-1">.text-danger</p>
              <p class="text-muted mb-0">.text-muted</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-header bg-body-tertiary fw-bold small">Fundo</div>
            <div class="card-body">
              <div class="p-2 mb-2 bg-primary text-white rounded">.bg-primary</div>
              <div class="p-2 mb-2 bg-light text-dark rounded">.bg-light</div>
              <div class="p-2 mb-0 bg-dark text-white rounded">.bg-dark</div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="h5 fw-bold mt-4 mb-3">Display — mostrar e ocultar</h3>
      <p class="text-muted small mb-3">Controle se o elemento é bloco, flex, inline, ou está escondido. Útil para layouts responsivos: <code>.d-none .d-md-block</code> esconde no mobile e mostra a partir de md.</p>
      ${componenteComCodigo('Display e responsivo',
        `<div class="d-flex flex-wrap gap-2">
          <span class="d-inline-block p-2 bg-primary text-white rounded">d-inline-block</span>
          <span class="d-inline-block p-2 bg-secondary text-white rounded">d-inline-block</span>
        </div>
        <div class="mt-2">
          <span class="d-block p-2 bg-primary bg-opacity-25 rounded">d-block</span>
        </div>
        <p class="mt-2 small text-muted mb-0">Em telas md+: <code>.d-none .d-md-block</code> — elemento só aparece a partir do breakpoint médio.</p>`,
        `<div class="d-flex">...</div>
<span class="d-block">...</span>
<div class="d-none d-md-block">Só em md ou maior</div>`,
        `d-inline, d-block, d-flex, d-none, d-md-block, etc.`,
        ''
      )}

      <h3 class="h5 fw-bold mt-4 mb-3">Flex — direção e alinhamento</h3>
      <p class="text-muted small mb-3">Com <code>.d-flex</code> os filhos viram itens flex. Use <code>justify-content-*</code> (start, center, end, between, around) e <code>align-items-*</code> (start, center, end) para alinhar.</p>
      ${componenteComCodigo('Flex: direção e justify',
        `<div class="d-flex flex-row gap-2 mb-2 p-2 bg-light rounded">
          <span class="p-2 bg-primary text-white rounded">1</span>
          <span class="p-2 bg-primary text-white rounded">2</span>
          <span class="p-2 bg-primary text-white rounded">3</span>
        </div>
        <div class="d-flex justify-content-between p-2 bg-light rounded mb-2">
          <span>Esquerda</span>
          <span>Direita</span>
        </div>
        <div class="d-flex justify-content-center gap-2 p-2 bg-light rounded">
          <span class="p-2 bg-secondary text-white rounded">Centro</span>
        </div>`,
        `<div class="d-flex flex-row">...</div>
<div class="d-flex justify-content-between">...</div>
<div class="d-flex justify-content-center">...</div>
<div class="d-flex flex-column">...</div>`,
        `flex-row, flex-column, justify-content-*, align-items-*`,
        ''
      )}

      <h3 class="h5 fw-bold mt-4 mb-3">Bordas e arredondamento</h3>
      <p class="text-muted small mb-3">Bordas com <code>.border</code>, <code>.border-primary</code>, <code>.border-top</code>, etc. Cantos arredondados: <code>.rounded</code>, <code>.rounded-3</code>, <code>.rounded-pill</code>.</p>
      ${componenteComCodigo('Bordas e rounded',
        `<div class="d-flex flex-wrap gap-2">
          <div class="p-3 border rounded">.border .rounded</div>
          <div class="p-3 border border-primary rounded-3">.border-primary .rounded-3</div>
          <div class="p-3 border rounded-pill">.rounded-pill</div>
        </div>`,
        `<div class="border rounded">...</div>
<div class="border border-primary rounded-3">...</div>`,
        `border, border-0, border-top, rounded, rounded-circle, rounded-pill`,
        ''
      )}

      <h3 class="h5 fw-bold mt-4 mb-3">Overflow e visibilidade</h3>
      <p class="text-muted small mb-3">Evite conteúdo vazando: <code>.overflow-auto</code> (scroll quando precisar), <code>.overflow-hidden</code>. Esconder visualmente mas manter para leitores de tela: <code>.visually-hidden</code>. Elemento invisível: <code>.invisible</code>.</p>
      ${componenteComCodigo('Overflow auto',
        `<div class="overflow-auto border rounded p-2" style="max-height: 80px;">
          Conteúdo longo que pode quebrar o layout. Com overflow-auto aparece uma barra de rolagem quando o conteúdo passa da altura máxima definida. Assim o bloco não estoura o container.
        </div>`,
        `<div class="overflow-auto" style="max-height: 200px;">
  Conteúdo longo...
</div>`,
        `overflow-auto, overflow-hidden, overflow-scroll`,
        ''
      )}

      <h3 class="h5 fw-bold mt-4 mb-3">Texto truncado e ratio</h3>
      <p class="text-muted small mb-3">Uma linha com reticências: <code>.text-truncate</code> (precisa de largura ou max-width). Vídeo responsivo com proporção fixa: <code>.ratio .ratio-16x9</code> com um <code>&lt;iframe&gt;</code> ou <code>&lt;video&gt;</code> dentro.</p>
      ${componenteComCodigo('Text truncate e ratio',
        `<div class="text-truncate border rounded p-2 mb-3" style="max-width: 100%;">Texto muito longo que será cortado com reticências no final quando não couber na linha.</div>
        <div class="ratio ratio-16x9 border rounded overflow-hidden" style="max-width: 320px;">
          <div class="bg-secondary d-flex align-items-center justify-content-center text-white">16:9</div>
        </div>`,
        `<p class="text-truncate" style="max-width: 200px;">Texto longo...</p>
<div class="ratio ratio-16x9">
  <iframe src="..."></iframe>
</div>`,
        `text-truncate; ratio ratio-16x9, ratio-4x3, ratio-1x1`,
        ''
      )}

      <h3 class="h5 fw-bold mt-4 mb-3">Stretched link</h3>
      <p class="text-muted small mb-3">Adicione <code>.stretched-link</code> em um link dentro de um card (ou outro bloco). O clique passa a valer em toda a área do card, mantendo o link acessível.</p>
      ${componenteComCodigo('Card clicável (stretched-link)',
        `<div class="card border position-relative" style="max-width: 18rem;">
          <div class="card-body">
            <h6 class="card-title">Título do card</h6>
            <p class="card-text small text-muted mb-2">Todo o card é clicável graças ao stretched-link.</p>
            <a href="#" class="stretched-link small">Ver mais</a>
          </div>
        </div>`,
        `<div class="card position-relative">
  <div class="card-body">
    <h5 class="card-title">Título</h5>
    <a href="#" class="stretched-link">Ver mais</a>
  </div>
</div>`,
        `O pai precisa ter position-relative`,
        ''
      )}

      <h3 class="h5 fw-bold mt-4 mb-3">Centralizar com margin</h3>
      <p class="text-muted small mb-3">Para centralizar um bloco de largura fixa na horizontal: <code>.mx-auto</code>. Funciona quando o elemento tem <code>display: block</code> e uma largura definida.</p>
      ${componenteComCodigo('mx-auto',
        `<div class="mx-auto p-3 bg-primary bg-opacity-25 rounded text-center" style="width: 200px;">Bloco centralizado</div>`,
        `<div class="mx-auto" style="width: 200px;">Conteúdo centralizado</div>`,
        `Margin horizontal automática`,
        ''
      )}
    </section>
  `;
}

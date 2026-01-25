// Páginas do Design System
const paginas = {
  cores: paginaCores,
  tipografia: paginaTipografia,
  espacamento: paginaEspacamento,
  grid: paginaGrid,
  containers: paginaContainers,
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
  navbar: paginaNavbar,
  breadcrumb: paginaBreadcrumb,
  tabs: paginaTabs,
  pagination: paginaPagination,
  dropdown: paginaDropdown,
  tabelas: paginaTabelas,
  'list-group': paginaListGroup,
  helpers: paginaHelpers
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  carregarPagina('cores');
  
  document.querySelectorAll('.sidebar-nav-item').forEach(botao => {
    botao.addEventListener('click', function() {
      const pagina = this.dataset.pagina;
      document.querySelectorAll('.sidebar-nav-item').forEach(b => b.classList.remove('ativo'));
      this.classList.add('ativo');
      carregarPagina(pagina);
    });
  });
});

function carregarPagina(pagina) {
  const conteudo = document.getElementById('conteudo-pagina');
  if (paginas[pagina]) {
    conteudo.innerHTML = paginas[pagina]();
  }
}

function toggleCodigo(botao) {
  const card = botao.closest('.card-componente');
  const codigoArea = card.querySelector('.card-componente-codigo');
  botao.classList.toggle('ativo');
  codigoArea.classList.toggle('visivel');
  botao.innerHTML = codigoArea.classList.contains('visivel') 
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> Ocultar'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> Código';
}

function trocarAba(botaoAba, abaAlvo) {
  const codigoArea = botaoAba.closest('.card-componente-codigo');
  codigoArea.querySelectorAll('.codigo-aba').forEach(aba => aba.classList.remove('ativo'));
  botaoAba.classList.add('ativo');
  codigoArea.querySelectorAll('.codigo-conteudo').forEach(conteudo => {
    conteudo.classList.toggle('visivel', conteudo.dataset.aba === abaAlvo);
  });
}

// Template de componente com código
function componenteComCodigo(titulo, preview, codigoEasyjur, codigoLegalops, descricao = '') {
  return `
    <div class="card-componente">
      <div class="card-componente-header">
        <div class="card-componente-titulo">${titulo}</div>
        <button class="btn-ver-codigo" onclick="toggleCodigo(this)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Código
        </button>
      </div>
      <div class="card-componente-preview">${preview}</div>
      <div class="card-componente-codigo">
        <div class="codigo-abas">
          <button class="codigo-aba ativo" onclick="trocarAba(this, 'easyjur')">EasyJur (SaaS)</button>
          <button class="codigo-aba" onclick="trocarAba(this, 'legalops')">LegalOps (React)</button>
        </div>
        <div class="codigo-conteudo visivel" data-aba="easyjur"><pre><code>${escapeHtml(codigoEasyjur)}</code></pre></div>
        <div class="codigo-conteudo" data-aba="legalops"><pre><code>${escapeHtml(codigoLegalops)}</code></pre></div>
      </div>
      ${descricao ? `<div class="card-componente-descricao">${descricao}</div>` : ''}
    </div>
  `;
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ===================== PÁGINAS =====================

function paginaCores() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Cores</h2>
      <p class="secao-descricao">Sistema de cores do EasyJur. São 3 cores principais que customizam o Bootstrap: Primária, Secundária e Terciária.</p>
      
      <h3 class="secao-subtitulo">Paleta Principal</h3>
      <div class="grid-3">
        <div class="card-cor">
          <div class="card-cor-amostra" style="background-color: #e5293f;"><span>#E5293F</span></div>
          <div class="card-cor-info"><div class="card-cor-nome">Primária</div><div class="card-cor-hex">$primary / --bs-primary</div></div>
        </div>
        <div class="card-cor">
          <div class="card-cor-amostra" style="background-color: #acbac2;"><span>#ACBAC2</span></div>
          <div class="card-cor-info"><div class="card-cor-nome">Secundária</div><div class="card-cor-hex">$secondary / --bs-secondary</div></div>
        </div>
        <div class="card-cor">
          <div class="card-cor-amostra" style="background-color: #7f919a;"><span>#7F919A</span></div>
          <div class="card-cor-info"><div class="card-cor-nome">Terciária</div><div class="card-cor-hex">$tertiary / --bs-tertiary</div></div>
        </div>
      </div>

      <h3 class="secao-subtitulo">Cores Semânticas (Bootstrap Padrão)</h3>
      <div class="grid-4">
        <div class="card-cor">
          <div class="card-cor-amostra" style="background-color: #198754;"><span>#198754</span></div>
          <div class="card-cor-info"><div class="card-cor-nome">Success</div><div class="card-cor-hex">$success</div></div>
        </div>
        <div class="card-cor">
          <div class="card-cor-amostra" style="background-color: #dc3545;"><span>#DC3545</span></div>
          <div class="card-cor-info"><div class="card-cor-nome">Danger</div><div class="card-cor-hex">$danger</div></div>
        </div>
        <div class="card-cor">
          <div class="card-cor-amostra" style="background-color: #ffc107;"><span>#FFC107</span></div>
          <div class="card-cor-info"><div class="card-cor-nome">Warning</div><div class="card-cor-hex">$warning</div></div>
        </div>
        <div class="card-cor">
          <div class="card-cor-amostra" style="background-color: #0dcaf0;"><span>#0DCAF0</span></div>
          <div class="card-cor-info"><div class="card-cor-nome">Info</div><div class="card-cor-hex">$info</div></div>
        </div>
      </div>

      <h3 class="secao-subtitulo">Neutros</h3>
      <div class="grid-4">
        <div class="card-cor">
          <div class="card-cor-amostra" style="background-color: #f8f9fa; border: 1px solid #e0e0e0;"><span style="background: #333;">#F8F9FA</span></div>
          <div class="card-cor-info"><div class="card-cor-nome">Light</div><div class="card-cor-hex">$light</div></div>
        </div>
        <div class="card-cor">
          <div class="card-cor-amostra" style="background-color: #212529;"><span>#212529</span></div>
          <div class="card-cor-info"><div class="card-cor-nome">Dark</div><div class="card-cor-hex">$dark</div></div>
        </div>
        <div class="card-cor">
          <div class="card-cor-amostra" style="background-color: #ffffff; border: 1px solid #e0e0e0;"><span style="background: #333;">#FFFFFF</span></div>
          <div class="card-cor-info"><div class="card-cor-nome">White</div><div class="card-cor-hex">$white</div></div>
        </div>
        <div class="card-cor">
          <div class="card-cor-amostra" style="background-color: #6c757d;"><span>#6C757D</span></div>
          <div class="card-cor-info"><div class="card-cor-nome">Gray</div><div class="card-cor-hex">$gray-600</div></div>
        </div>
      </div>
    </section>
  `;
}

function paginaTipografia() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Tipografia</h2>
      <p class="secao-descricao">Fonte Borna para toda a interface. Classes de texto e utilitários tipográficos.</p>
      
      ${componenteComCodigo('Headings',
        `<h1>h1. Heading</h1>
         <h2>h2. Heading</h2>
         <h3>h3. Heading</h3>
         <h4>h4. Heading</h4>
         <h5>h5. Heading</h5>
         <h6>h6. Heading</h6>`,
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
        `<div style="font-size: 48px; font-weight: 300;">Display 1</div>
         <div style="font-size: 36px; font-weight: 300;">Display 2</div>
         <div style="font-size: 28px; font-weight: 300;">Display 3</div>`,
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
        `<p class="lead" style="font-size: 1.25rem;">Parágrafo de destaque (lead).</p>
         <p>Parágrafo normal com <strong>texto em negrito</strong>, <em>itálico</em> e <a href="#">link</a>.</p>
         <p><small>Texto pequeno (small)</small></p>`,
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
    </section>
  `;
}

function paginaEspacamento() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Espaçamento</h2>
      <p class="secao-descricao">Classes utilitárias para margin (m) e padding (p). Escala de 0-5 + auto.</p>
      
      <div class="card-componente">
        <div class="card-componente-header"><div class="card-componente-titulo">Escala de Espaçamento</div></div>
        <div class="card-componente-preview">
          <table class="table">
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

      <div class="card-componente">
        <div class="card-componente-header"><div class="card-componente-titulo">Direções</div></div>
        <div class="card-componente-preview">
          <table class="table">
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
    </section>
  `;
}

function paginaGrid() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Grid System</h2>
      <p class="secao-descricao">Sistema de grid de 12 colunas do Bootstrap com breakpoints responsivos.</p>
      
      ${componenteComCodigo('Colunas Básicas',
        `<div style="background: var(--cor-fundo); padding: 16px; border-radius: 8px;">
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <div style="flex: 1; background: var(--cor-primaria); color: white; padding: 12px; text-align: center; border-radius: 4px;">col</div>
            <div style="flex: 1; background: var(--cor-primaria); color: white; padding: 12px; text-align: center; border-radius: 4px;">col</div>
            <div style="flex: 1; background: var(--cor-primaria); color: white; padding: 12px; text-align: center; border-radius: 4px;">col</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <div style="flex: 0 0 50%; background: var(--cor-secundaria); padding: 12px; text-align: center; border-radius: 4px;">col-6</div>
            <div style="flex: 0 0 calc(50% - 8px); background: var(--cor-secundaria); padding: 12px; text-align: center; border-radius: 4px;">col-6</div>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="container">
    <div class="row">
      <div class="col">col</div>
      <div class="col">col</div>
      <div class="col">col</div>
    </div>
    <div class="row">
      <div class="col-6">col-6</div>
      <div class="col-6">col-6</div>
    </div>
  </div>
</div>`,
        `import { Grid, Row, Col } from '@legalops/ui';

<Grid>
  <Row>
    <Col>col</Col>
    <Col>col</Col>
    <Col>col</Col>
  </Row>
</Grid>`,
        'row + col para criar layouts flexíveis'
      )}

      <div class="card-componente">
        <div class="card-componente-header"><div class="card-componente-titulo">Breakpoints</div></div>
        <div class="card-componente-preview">
          <table class="table">
            <thead><tr><th>Breakpoint</th><th>Classe</th><th>Largura</th></tr></thead>
            <tbody>
              <tr><td>Extra small</td><td><code>col-*</code></td><td>&lt;576px</td></tr>
              <tr><td>Small</td><td><code>col-sm-*</code></td><td>≥576px</td></tr>
              <tr><td>Medium</td><td><code>col-md-*</code></td><td>≥768px</td></tr>
              <tr><td>Large</td><td><code>col-lg-*</code></td><td>≥992px</td></tr>
              <tr><td>Extra large</td><td><code>col-xl-*</code></td><td>≥1200px</td></tr>
              <tr><td>XXL</td><td><code>col-xxl-*</code></td><td>≥1400px</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function paginaContainers() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Containers</h2>
      <p class="secao-descricao">Elementos de layout para centralizar e limitar largura do conteúdo.</p>
      
      <div class="card-componente">
        <div class="card-componente-header"><div class="card-componente-titulo">Tipos de Container</div></div>
        <div class="card-componente-preview">
          <table class="table">
            <thead><tr><th>Classe</th><th>Extra small</th><th>Small ≥576</th><th>Medium ≥768</th><th>Large ≥992</th><th>XL ≥1200</th><th>XXL ≥1400</th></tr></thead>
            <tbody>
              <tr><td><code>.container</code></td><td>100%</td><td>540px</td><td>720px</td><td>960px</td><td>1140px</td><td>1320px</td></tr>
              <tr><td><code>.container-fluid</code></td><td colspan="6">100% em todos os breakpoints</td></tr>
              <tr><td><code>.container-sm</code></td><td>100%</td><td>540px</td><td>720px</td><td>960px</td><td>1140px</td><td>1320px</td></tr>
              <tr><td><code>.container-md</code></td><td>100%</td><td>100%</td><td>720px</td><td>960px</td><td>1140px</td><td>1320px</td></tr>
              <tr><td><code>.container-lg</code></td><td>100%</td><td>100%</td><td>100%</td><td>960px</td><td>1140px</td><td>1320px</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

function paginaBotoes() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Botões</h2>
      <p class="secao-descricao">Botões interativos com as cores do design system: Primária, Secundária e Terciária.</p>
      
      ${componenteComCodigo('Botões Sólidos',
        `<div class="preview-flex">
          <button class="btn btn-primary">Primário</button>
          <button class="btn btn-secondary">Secundário</button>
          <button class="btn btn-tertiary">Terciário</button>
        </div>`,
        `<div class="rebranding">
  <button class="btn btn-primary">Primário</button>
  <button class="btn btn-secondary">Secundário</button>
  <button class="btn btn-tertiary">Terciário</button>
</div>`,
        `import { Button } from '@legalops/ui';

<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="tertiary">Terciário</Button>`,
        'Primária (#E5293F) | Secundária (#ACBAC2) | Terciária (#7F919A)'
      )}

      ${componenteComCodigo('Botões Outline',
        `<div class="preview-flex">
          <button class="btn btn-outline-primary">Outline Primário</button>
          <button class="btn btn-outline-secondary">Outline Secundário</button>
          <button class="btn btn-outline-tertiary">Outline Terciário</button>
        </div>`,
        `<div class="rebranding">
  <button class="btn btn-outline-primary">Outline Primário</button>
  <button class="btn btn-outline-secondary">Outline Secundário</button>
  <button class="btn btn-outline-tertiary">Outline Terciário</button>
</div>`,
        `<Button variant="outline-primary">Outline Primário</Button>
<Button variant="outline-secondary">Outline Secundário</Button>
<Button variant="outline-tertiary">Outline Terciário</Button>`,
        ''
      )}

      ${componenteComCodigo('Tamanhos',
        `<div class="preview-flex">
          <button class="btn btn-primary btn-sm">Pequeno</button>
          <button class="btn btn-primary">Normal</button>
          <button class="btn btn-primary btn-lg">Grande</button>
        </div>`,
        `<div class="rebranding">
  <button class="btn btn-primary btn-sm">Pequeno</button>
  <button class="btn btn-primary">Normal</button>
  <button class="btn btn-primary btn-lg">Grande</button>
</div>`,
        `<Button size="sm">Pequeno</Button>
<Button>Normal</Button>
<Button size="lg">Grande</Button>`,
        'btn-sm | padrão | btn-lg'
      )}

      ${componenteComCodigo('Estados',
        `<div class="preview-flex">
          <button class="btn btn-primary">Normal</button>
          <button class="btn btn-primary" disabled>Desabilitado</button>
        </div>`,
        `<div class="rebranding">
  <button class="btn btn-primary">Normal</button>
  <button class="btn btn-primary" disabled>Desabilitado</button>
</div>`,
        `<Button>Normal</Button>
<Button disabled>Desabilitado</Button>`,
        ''
      )}

      ${componenteComCodigo('Cores Semânticas',
        `<div class="preview-flex">
          <button class="btn" style="background: #198754; color: white; border-color: #198754;">Success</button>
          <button class="btn" style="background: #dc3545; color: white; border-color: #dc3545;">Danger</button>
          <button class="btn" style="background: #ffc107; color: #333; border-color: #ffc107;">Warning</button>
          <button class="btn" style="background: #0dcaf0; color: #333; border-color: #0dcaf0;">Info</button>
        </div>`,
        `<div class="rebranding">
  <button class="btn btn-success">Success</button>
  <button class="btn btn-danger">Danger</button>
  <button class="btn btn-warning">Warning</button>
  <button class="btn btn-info">Info</button>
</div>`,
        `<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>`,
        'Cores padrão do Bootstrap para feedback'
      )}
    </section>
  `;
}

function paginaBadges() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Badges</h2>
      <p class="secao-descricao">Indicadores visuais para contadores, status e categorização.</p>
      
      ${componenteComCodigo('Badges Sólidos',
        `<div class="preview-flex">
          <span class="badge badge-primary">Primário</span>
          <span class="badge badge-secondary">Secundário</span>
          <span class="badge badge-tertiary">Terciário</span>
        </div>`,
        `<div class="rebranding">
  <span class="badge bg-primary">Primário</span>
  <span class="badge bg-secondary">Secundário</span>
  <span class="badge bg-tertiary">Terciário</span>
</div>`,
        `import { Badge } from '@legalops/ui';

<Badge variant="primary">Primário</Badge>
<Badge variant="secondary">Secundário</Badge>
<Badge variant="tertiary">Terciário</Badge>`,
        ''
      )}

      ${componenteComCodigo('Badge Outline',
        `<div class="preview-flex">
          <span class="badge badge-outline-primary">Outline</span>
        </div>`,
        `<div class="rebranding">
  <span class="badge text-primary border border-primary">Outline</span>
</div>`,
        `<Badge variant="outline">Outline</Badge>`,
        ''
      )}

      ${componenteComCodigo('Badges Semânticos',
        `<div class="preview-flex">
          <span class="badge" style="background: #198754; color: white;">Success</span>
          <span class="badge" style="background: #dc3545; color: white;">Danger</span>
          <span class="badge" style="background: #ffc107; color: #333;">Warning</span>
          <span class="badge" style="background: #0dcaf0; color: #333;">Info</span>
        </div>`,
        `<div class="rebranding">
  <span class="badge bg-success">Success</span>
  <span class="badge bg-danger">Danger</span>
  <span class="badge bg-warning text-dark">Warning</span>
  <span class="badge bg-info text-dark">Info</span>
</div>`,
        `<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>`,
        ''
      )}
    </section>
  `;
}

function paginaAlertas() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Alertas</h2>
      <p class="secao-descricao">Mensagens de feedback contextuais para ações do usuário.</p>
      
      ${componenteComCodigo('Alertas do Design System',
        `<div class="alert alert-primary">Alerta primário — usando a cor principal do EasyJur.</div>
         <div class="alert alert-secondary">Alerta secundário — informação neutra.</div>
         <div class="alert alert-tertiary">Alerta terciário — destaque sutil.</div>`,
        `<div class="rebranding">
  <div class="alert alert-primary">Alerta primário</div>
  <div class="alert alert-secondary">Alerta secundário</div>
  <div class="alert alert-tertiary">Alerta terciário</div>
</div>`,
        `import { Alert } from '@legalops/ui';

<Alert variant="primary">Alerta primário</Alert>
<Alert variant="secondary">Alerta secundário</Alert>
<Alert variant="tertiary">Alerta terciário</Alert>`,
        ''
      )}

      ${componenteComCodigo('Alertas Semânticos',
        `<div class="alert alert-success">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
           <strong>Sucesso!</strong> Operação realizada com sucesso.
         </div>
         <div class="alert alert-danger">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
           <strong>Erro!</strong> Não foi possível completar a operação.
         </div>
         <div class="alert alert-warning">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
           <strong>Atenção!</strong> Verifique os dados informados.
         </div>
         <div class="alert alert-info">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
           <strong>Info:</strong> Esta é uma mensagem informativa.
         </div>`,
        `<div class="rebranding">
  <div class="alert alert-success">Sucesso!</div>
  <div class="alert alert-danger">Erro!</div>
  <div class="alert alert-warning">Atenção!</div>
  <div class="alert alert-info">Info</div>
</div>`,
        `<Alert variant="success">Sucesso!</Alert>
<Alert variant="danger">Erro!</Alert>
<Alert variant="warning">Atenção!</Alert>
<Alert variant="info">Info</Alert>`,
        ''
      )}
    </section>
  `;
}

function paginaCards() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Cards</h2>
      <p class="secao-descricao">Containers flexíveis para agrupar conteúdo relacionado.</p>
      
      ${componenteComCodigo('Card Básico',
        `<div style="max-width: 300px;">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Título do Card</h5>
              <p class="card-text">Conteúdo do card com informações relevantes para o usuário.</p>
              <button class="btn btn-primary btn-sm">Ação</button>
            </div>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Título do Card</h5>
      <p class="card-text">Conteúdo do card.</p>
      <a href="#" class="btn btn-primary">Ação</a>
    </div>
  </div>
</div>`,
        `import { Card, Button } from '@legalops/ui';

<Card>
  <Card.Body>
    <Card.Title>Título do Card</Card.Title>
    <Card.Text>Conteúdo do card.</Card.Text>
    <Button>Ação</Button>
  </Card.Body>
</Card>`,
        ''
      )}

      ${componenteComCodigo('Card com Header e Footer',
        `<div style="max-width: 300px;">
          <div class="card">
            <div class="card-header">Header</div>
            <div class="card-body">
              <p class="card-text">Conteúdo do card.</p>
            </div>
            <div class="card-footer">Footer</div>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="card">
    <div class="card-header">Header</div>
    <div class="card-body">
      <p class="card-text">Conteúdo do card.</p>
    </div>
    <div class="card-footer">Footer</div>
  </div>
</div>`,
        `<Card>
  <Card.Header>Header</Card.Header>
  <Card.Body>Conteúdo</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>`,
        ''
      )}

      ${componenteComCodigo('Card com Borda Primária',
        `<div style="max-width: 300px;">
          <div class="card card-primary">
            <div class="card-header">Destaque</div>
            <div class="card-body">
              <p class="card-text">Card com borda e header na cor primária.</p>
            </div>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="card border-primary">
    <div class="card-header bg-primary text-white">Destaque</div>
    <div class="card-body">
      <p class="card-text">Card com destaque.</p>
    </div>
  </div>
</div>`,
        `<Card variant="primary">
  <Card.Header>Destaque</Card.Header>
  <Card.Body>Card com destaque.</Card.Body>
</Card>`,
        ''
      )}
    </section>
  `;
}

function paginaAccordion() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Accordion</h2>
      <p class="secao-descricao">Painéis expansíveis para organizar conteúdo em seções colapsáveis.</p>
      
      ${componenteComCodigo('Accordion Básico',
        `<div class="accordion">
          <div class="accordion-item">
            <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('show')">
              Item 1 <span>▼</span>
            </div>
            <div class="accordion-body show">Conteúdo do primeiro item do accordion.</div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('show')">
              Item 2 <span>▼</span>
            </div>
            <div class="accordion-body">Conteúdo do segundo item do accordion.</div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('show')">
              Item 3 <span>▼</span>
            </div>
            <div class="accordion-body">Conteúdo do terceiro item do accordion.</div>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
          Item 1
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
        <div class="accordion-body">Conteúdo do primeiro item.</div>
      </div>
    </div>
  </div>
</div>`,
        `import { Accordion } from '@legalops/ui';

<Accordion>
  <Accordion.Item title="Item 1">
    Conteúdo do primeiro item.
  </Accordion.Item>
  <Accordion.Item title="Item 2">
    Conteúdo do segundo item.
  </Accordion.Item>
</Accordion>`,
        ''
      )}
    </section>
  `;
}

function paginaModais() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Modais</h2>
      <p class="secao-descricao">Diálogos modais para interações focadas sem sair da página.</p>
      
      ${componenteComCodigo('Modal Básico',
        `<div class="modal-preview">
          <div class="modal-dialog-preview">
            <div class="modal-header-preview">
              <h5 class="modal-title">Título do Modal</h5>
              <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body-preview">
              <p>Conteúdo do modal. Pode incluir texto, formulários, imagens, etc.</p>
            </div>
            <div class="modal-footer-preview">
              <button class="btn btn-outline-primary">Cancelar</button>
              <button class="btn btn-primary">Confirmar</button>
            </div>
          </div>
        </div>`,
        `<div class="rebranding">
  <!-- Botão para abrir modal -->
  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#meuModal">
    Abrir Modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="meuModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Título do Modal</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p>Conteúdo do modal.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-primary" data-bs-dismiss="modal">Cancelar</button>
          <button class="btn btn-primary">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
        `import { Modal, Button } from '@legalops/ui';
import { useState } from 'react';

function Exemplo() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <Button onClick={() => setAberto(true)}>Abrir Modal</Button>
      
      <Modal isOpen={aberto} onClose={() => setAberto(false)}>
        <Modal.Header>Título do Modal</Modal.Header>
        <Modal.Body>Conteúdo do modal.</Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setAberto(false)}>Cancelar</Button>
          <Button>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}`,
        ''
      )}
    </section>
  `;
}

function paginaTooltips() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Tooltips e Popovers</h2>
      <p class="secao-descricao">Dicas contextuais que aparecem ao passar o mouse ou clicar.</p>
      
      ${componenteComCodigo('Tooltip',
        `<div class="preview-flex" style="padding: 40px 0;">
          <div class="tooltip-demo">
            <button class="btn btn-primary">Hover aqui</button>
            <div class="tooltip-box">Texto do tooltip</div>
          </div>
        </div>`,
        `<div class="rebranding">
  <button type="button" class="btn btn-primary" 
          data-bs-toggle="tooltip" 
          data-bs-placement="top" 
          title="Texto do tooltip">
    Hover aqui
  </button>
</div>

<script>
  // Inicializar tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (el) {
    return new bootstrap.Tooltip(el)
  })
</script>`,
        `import { Tooltip, Button } from '@legalops/ui';

<Tooltip content="Texto do tooltip">
  <Button>Hover aqui</Button>
</Tooltip>`,
        ''
      )}

      ${componenteComCodigo('Posições',
        `<div class="preview-flex" style="gap: 40px; padding: 20px 0;">
          <div style="text-align: center;">Top<br><small style="color: var(--cor-terciaria);">data-bs-placement="top"</small></div>
          <div style="text-align: center;">Right<br><small style="color: var(--cor-terciaria);">data-bs-placement="right"</small></div>
          <div style="text-align: center;">Bottom<br><small style="color: var(--cor-terciaria);">data-bs-placement="bottom"</small></div>
          <div style="text-align: center;">Left<br><small style="color: var(--cor-terciaria);">data-bs-placement="left"</small></div>
        </div>`,
        `<div class="rebranding">
  <button data-bs-toggle="tooltip" data-bs-placement="top" title="Top">Top</button>
  <button data-bs-toggle="tooltip" data-bs-placement="right" title="Right">Right</button>
  <button data-bs-toggle="tooltip" data-bs-placement="bottom" title="Bottom">Bottom</button>
  <button data-bs-toggle="tooltip" data-bs-placement="left" title="Left">Left</button>
</div>`,
        `<Tooltip content="Top" placement="top"><Button>Top</Button></Tooltip>
<Tooltip content="Right" placement="right"><Button>Right</Button></Tooltip>
<Tooltip content="Bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
<Tooltip content="Left" placement="left"><Button>Left</Button></Tooltip>`,
        ''
      )}
    </section>
  `;
}

function paginaProgress() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Progress</h2>
      <p class="secao-descricao">Barras de progresso para indicar status de carregamento ou conclusão.</p>
      
      ${componenteComCodigo('Progress Básico',
        `<div class="preview-flex-col" style="gap: 16px;">
          <div class="progress"><div class="progress-bar" style="width: 25%;"></div></div>
          <div class="progress"><div class="progress-bar" style="width: 50%;"></div></div>
          <div class="progress"><div class="progress-bar" style="width: 75%;"></div></div>
          <div class="progress"><div class="progress-bar" style="width: 100%;"></div></div>
        </div>`,
        `<div class="rebranding">
  <div class="progress">
    <div class="progress-bar" style="width: 25%"></div>
  </div>
  <div class="progress">
    <div class="progress-bar" style="width: 50%"></div>
  </div>
  <div class="progress">
    <div class="progress-bar" style="width: 75%"></div>
  </div>
</div>`,
        `import { Progress } from '@legalops/ui';

<Progress value={25} />
<Progress value={50} />
<Progress value={75} />`,
        ''
      )}

      ${componenteComCodigo('Cores',
        `<div class="preview-flex-col" style="gap: 16px;">
          <div class="progress"><div class="progress-bar" style="width: 60%;"></div></div>
          <div class="progress"><div class="progress-bar progress-bar-secondary" style="width: 60%;"></div></div>
          <div class="progress"><div class="progress-bar progress-bar-tertiary" style="width: 60%;"></div></div>
        </div>`,
        `<div class="rebranding">
  <div class="progress">
    <div class="progress-bar bg-primary" style="width: 60%"></div>
  </div>
  <div class="progress">
    <div class="progress-bar bg-secondary" style="width: 60%"></div>
  </div>
  <div class="progress">
    <div class="progress-bar bg-tertiary" style="width: 60%"></div>
  </div>
</div>`,
        `<Progress value={60} variant="primary" />
<Progress value={60} variant="secondary" />
<Progress value={60} variant="tertiary" />`,
        ''
      )}
    </section>
  `;
}

function paginaSpinners() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Spinners</h2>
      <p class="secao-descricao">Indicadores de carregamento para feedback visual de processos.</p>
      
      ${componenteComCodigo('Spinner Básico',
        `<div class="preview-flex">
          <div class="spinner"></div>
          <div class="spinner" style="border-top-color: var(--cor-secundaria);"></div>
          <div class="spinner" style="border-top-color: var(--cor-terciaria);"></div>
        </div>`,
        `<div class="rebranding">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Carregando...</span>
  </div>
  <div class="spinner-border text-secondary" role="status"></div>
  <div class="spinner-border text-tertiary" role="status"></div>
</div>`,
        `import { Spinner } from '@legalops/ui';

<Spinner variant="primary" />
<Spinner variant="secondary" />
<Spinner variant="tertiary" />`,
        ''
      )}

      ${componenteComCodigo('Tamanhos',
        `<div class="preview-flex">
          <div class="spinner spinner-sm"></div>
          <div class="spinner"></div>
          <div class="spinner spinner-lg"></div>
        </div>`,
        `<div class="rebranding">
  <div class="spinner-border spinner-border-sm"></div>
  <div class="spinner-border"></div>
  <div class="spinner-border" style="width: 3rem; height: 3rem;"></div>
</div>`,
        `<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`,
        ''
      )}

      ${componenteComCodigo('Botão com Spinner',
        `<div class="preview-flex">
          <button class="btn btn-primary" disabled style="display: flex; align-items: center; gap: 8px;">
            <div class="spinner spinner-sm" style="border-color: rgba(255,255,255,0.3); border-top-color: white;"></div>
            Carregando...
          </button>
        </div>`,
        `<div class="rebranding">
  <button class="btn btn-primary" disabled>
    <span class="spinner-border spinner-border-sm me-2"></span>
    Carregando...
  </button>
</div>`,
        `<Button loading>Carregando...</Button>`,
        ''
      )}
    </section>
  `;
}

function paginaToasts() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Toasts</h2>
      <p class="secao-descricao">Notificações não intrusivas para feedback de ações.</p>
      
      ${componenteComCodigo('Toast Básico',
        `<div class="toast">
          <div class="toast-header">
            <strong style="flex: 1;">Notificação</strong>
            <small style="color: var(--cor-terciaria);">agora</small>
          </div>
          <div class="toast-body">
            Mensagem da notificação aqui.
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="toast show" role="alert">
    <div class="toast-header">
      <strong class="me-auto">Notificação</strong>
      <small>agora</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">
      Mensagem da notificação aqui.
    </div>
  </div>
</div>

<script>
  // Mostrar toast via JavaScript
  var toastEl = document.querySelector('.toast')
  var toast = new bootstrap.Toast(toastEl)
  toast.show()
</script>`,
        `import { Toast, useToast } from '@legalops/ui';

function Exemplo() {
  const { showToast } = useToast();

  return (
    <Button onClick={() => showToast({
      title: 'Notificação',
      message: 'Mensagem da notificação aqui.'
    })}>
      Mostrar Toast
    </Button>
  );
}`,
        ''
      )}
    </section>
  `;
}

function paginaInputs() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Inputs</h2>
      <p class="secao-descricao">Campos de entrada de texto com diferentes variações e estados.</p>
      
      ${componenteComCodigo('Input Básico',
        `<div style="max-width: 400px;">
          <div class="form-group">
            <label class="form-label">Nome</label>
            <input type="text" class="form-control" placeholder="Digite seu nome">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" placeholder="Digite seu email">
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="mb-3">
    <label class="form-label">Nome</label>
    <input type="text" class="form-control" placeholder="Digite seu nome">
  </div>
  <div class="mb-3">
    <label class="form-label">Email</label>
    <input type="email" class="form-control" placeholder="Digite seu email">
  </div>
</div>`,
        `import { Input, FormField } from '@legalops/ui';

<FormField label="Nome">
  <Input placeholder="Digite seu nome" />
</FormField>
<FormField label="Email">
  <Input type="email" placeholder="Digite seu email" />
</FormField>`,
        ''
      )}

      ${componenteComCodigo('Tamanhos',
        `<div style="max-width: 400px;" class="preview-flex-col">
          <input type="text" class="form-control form-control-sm" placeholder="Pequeno">
          <input type="text" class="form-control" placeholder="Normal">
          <input type="text" class="form-control form-control-lg" placeholder="Grande">
        </div>`,
        `<div class="rebranding">
  <input class="form-control form-control-sm" placeholder="Pequeno">
  <input class="form-control" placeholder="Normal">
  <input class="form-control form-control-lg" placeholder="Grande">
</div>`,
        `<Input size="sm" placeholder="Pequeno" />
<Input placeholder="Normal" />
<Input size="lg" placeholder="Grande" />`,
        ''
      )}

      ${componenteComCodigo('Textarea',
        `<div style="max-width: 400px;">
          <div class="form-group">
            <label class="form-label">Mensagem</label>
            <textarea class="form-control" rows="3" placeholder="Digite sua mensagem"></textarea>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="mb-3">
    <label class="form-label">Mensagem</label>
    <textarea class="form-control" rows="3" placeholder="Digite sua mensagem"></textarea>
  </div>
</div>`,
        `<FormField label="Mensagem">
  <Textarea rows={3} placeholder="Digite sua mensagem" />
</FormField>`,
        ''
      )}
    </section>
  `;
}

function paginaSelects() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Selects</h2>
      <p class="secao-descricao">Campos de seleção dropdown para escolha de opções.</p>
      
      ${componenteComCodigo('Select Básico',
        `<div style="max-width: 400px;">
          <div class="form-group">
            <label class="form-label">Departamento</label>
            <select class="form-select">
              <option selected>Selecione...</option>
              <option value="1">Jurídico</option>
              <option value="2">Financeiro</option>
              <option value="3">Administrativo</option>
            </select>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="mb-3">
    <label class="form-label">Departamento</label>
    <select class="form-select">
      <option selected>Selecione...</option>
      <option value="1">Jurídico</option>
      <option value="2">Financeiro</option>
      <option value="3">Administrativo</option>
    </select>
  </div>
</div>`,
        `import { Select, FormField } from '@legalops/ui';

<FormField label="Departamento">
  <Select
    placeholder="Selecione..."
    options={[
      { value: '1', label: 'Jurídico' },
      { value: '2', label: 'Financeiro' },
      { value: '3', label: 'Administrativo' }
    ]}
  />
</FormField>`,
        ''
      )}
    </section>
  `;
}

function paginaCheckboxes() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Checkboxes e Radios</h2>
      <p class="secao-descricao">Campos de seleção múltipla (checkbox) e única (radio).</p>
      
      ${componenteComCodigo('Checkboxes',
        `<div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="check1" checked>
            <label class="form-check-label" for="check1">Opção selecionada</label>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="check2">
            <label class="form-check-label" for="check2">Opção não selecionada</label>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="check3" disabled>
            <label class="form-check-label" for="check3">Desabilitado</label>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="check1" checked>
    <label class="form-check-label" for="check1">Opção selecionada</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="check2">
    <label class="form-check-label" for="check2">Opção não selecionada</label>
  </div>
</div>`,
        `import { Checkbox } from '@legalops/ui';

<Checkbox checked label="Opção selecionada" />
<Checkbox label="Opção não selecionada" />
<Checkbox disabled label="Desabilitado" />`,
        ''
      )}

      ${componenteComCodigo('Radio Buttons',
        `<div>
          <div class="form-check">
            <input type="radio" class="form-check-input" name="radio" id="radio1" checked>
            <label class="form-check-label" for="radio1">Opção 1</label>
          </div>
          <div class="form-check">
            <input type="radio" class="form-check-input" name="radio" id="radio2">
            <label class="form-check-label" for="radio2">Opção 2</label>
          </div>
          <div class="form-check">
            <input type="radio" class="form-check-input" name="radio" id="radio3">
            <label class="form-check-label" for="radio3">Opção 3</label>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="form-check">
    <input class="form-check-input" type="radio" name="opcoes" id="radio1" checked>
    <label class="form-check-label" for="radio1">Opção 1</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="opcoes" id="radio2">
    <label class="form-check-label" for="radio2">Opção 2</label>
  </div>
</div>`,
        `import { Radio, RadioGroup } from '@legalops/ui';

<RadioGroup name="opcoes" value={valor} onChange={setValor}>
  <Radio value="1" label="Opção 1" />
  <Radio value="2" label="Opção 2" />
  <Radio value="3" label="Opção 3" />
</RadioGroup>`,
        ''
      )}
    </section>
  `;
}

function paginaSwitches() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Switches</h2>
      <p class="secao-descricao">Interruptores para ativar/desativar opções de forma visual.</p>
      
      ${componenteComCodigo('Switch Básico',
        `<div class="preview-flex-col">
          <div class="form-switch">
            <input type="checkbox" class="form-switch-input" id="switch1" checked>
            <label for="switch1">Ativado</label>
          </div>
          <div class="form-switch">
            <input type="checkbox" class="form-switch-input" id="switch2">
            <label for="switch2">Desativado</label>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="switch1" checked>
    <label class="form-check-label" for="switch1">Ativado</label>
  </div>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="switch2">
    <label class="form-check-label" for="switch2">Desativado</label>
  </div>
</div>`,
        `import { Switch } from '@legalops/ui';

<Switch checked label="Ativado" onChange={handleChange} />
<Switch label="Desativado" onChange={handleChange} />`,
        ''
      )}
    </section>
  `;
}

function paginaInputGroup() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Input Group</h2>
      <p class="secao-descricao">Campos de entrada com elementos adicionais como ícones ou botões.</p>
      
      ${componenteComCodigo('Com Texto',
        `<div style="max-width: 400px;" class="preview-flex-col">
          <div class="input-group">
            <span class="input-group-text">@</span>
            <input type="text" class="form-control" placeholder="Username">
          </div>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Valor">
            <span class="input-group-text">,00</span>
          </div>
          <div class="input-group">
            <span class="input-group-text">R$</span>
            <input type="text" class="form-control" placeholder="0">
            <span class="input-group-text">,00</span>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="input-group mb-3">
    <span class="input-group-text">@</span>
    <input type="text" class="form-control" placeholder="Username">
  </div>
  <div class="input-group mb-3">
    <span class="input-group-text">R$</span>
    <input type="text" class="form-control" placeholder="0">
    <span class="input-group-text">,00</span>
  </div>
</div>`,
        `import { InputGroup, Input } from '@legalops/ui';

<InputGroup>
  <InputGroup.Text>@</InputGroup.Text>
  <Input placeholder="Username" />
</InputGroup>

<InputGroup>
  <InputGroup.Text>R$</InputGroup.Text>
  <Input placeholder="0" />
  <InputGroup.Text>,00</InputGroup.Text>
</InputGroup>`,
        ''
      )}
    </section>
  `;
}

function paginaNavbar() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Navbar</h2>
      <p class="secao-descricao">Barra de navegação principal com logo, links e ações.</p>
      
      ${componenteComCodigo('Navbar Básica',
        `<div style="background: var(--cor-primaria); padding: 12px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
          <div style="color: white; font-weight: 700; font-size: 18px;">EasyJur</div>
          <div style="display: flex; gap: 20px;">
            <a href="#" style="color: white; text-decoration: none; font-size: 14px;">Home</a>
            <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px;">Produtos</a>
            <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px;">Contato</a>
          </div>
        </div>`,
        `<div class="rebranding">
  <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">EasyJur</a>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Produtos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contato</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>`,
        `import { Navbar, NavLink } from '@legalops/ui';

<Navbar brand="EasyJur">
  <NavLink href="#" active>Home</NavLink>
  <NavLink href="#">Produtos</NavLink>
  <NavLink href="#">Contato</NavLink>
</Navbar>`,
        ''
      )}
    </section>
  `;
}

function paginaBreadcrumb() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Breadcrumb</h2>
      <p class="secao-descricao">Indicador de navegação hierárquica para mostrar localização.</p>
      
      ${componenteComCodigo('Breadcrumb Básico',
        `<nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Biblioteca</a></li>
            <li class="breadcrumb-item active">Documento</li>
          </ol>
        </nav>`,
        `<div class="rebranding">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item"><a href="#">Biblioteca</a></li>
      <li class="breadcrumb-item active" aria-current="page">Documento</li>
    </ol>
  </nav>
</div>`,
        `import { Breadcrumb } from '@legalops/ui';

<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Biblioteca', href: '/biblioteca' },
  { label: 'Documento', active: true }
]} />`,
        ''
      )}
    </section>
  `;
}

function paginaTabs() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Tabs e Pills</h2>
      <p class="secao-descricao">Navegação em abas para alternar entre conteúdos relacionados.</p>
      
      ${componenteComCodigo('Tabs',
        `<div>
          <div class="nav-tabs" style="margin-bottom: 16px;">
            <button class="nav-link active">Aba 1</button>
            <button class="nav-link">Aba 2</button>
            <button class="nav-link">Aba 3</button>
          </div>
          <div style="padding: 16px; background: var(--cor-fundo); border-radius: 8px;">
            Conteúdo da aba selecionada.
          </div>
        </div>`,
        `<div class="rebranding">
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab1">Aba 1</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab2">Aba 2</button>
    </li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane fade show active" id="tab1">Conteúdo 1</div>
    <div class="tab-pane fade" id="tab2">Conteúdo 2</div>
  </div>
</div>`,
        `import { Tabs, Tab } from '@legalops/ui';

<Tabs defaultValue="tab1">
  <Tab value="tab1" label="Aba 1">
    Conteúdo 1
  </Tab>
  <Tab value="tab2" label="Aba 2">
    Conteúdo 2
  </Tab>
</Tabs>`,
        ''
      )}

      ${componenteComCodigo('Pills',
        `<div>
          <div class="nav-pills" style="margin-bottom: 16px;">
            <button class="nav-link active">Pill 1</button>
            <button class="nav-link">Pill 2</button>
            <button class="nav-link">Pill 3</button>
          </div>
        </div>`,
        `<div class="rebranding">
  <ul class="nav nav-pills">
    <li class="nav-item">
      <a class="nav-link active" href="#">Pill 1</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Pill 2</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Pill 3</a>
    </li>
  </ul>
</div>`,
        `<Tabs variant="pills" defaultValue="pill1">
  <Tab value="pill1" label="Pill 1">Conteúdo 1</Tab>
  <Tab value="pill2" label="Pill 2">Conteúdo 2</Tab>
</Tabs>`,
        ''
      )}
    </section>
  `;
}

function paginaPagination() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Pagination</h2>
      <p class="secao-descricao">Controles de paginação para navegar entre páginas de conteúdo.</p>
      
      ${componenteComCodigo('Pagination Básica',
        `<nav>
          <ul class="pagination">
            <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">»</a></li>
          </ul>
        </nav>`,
        `<div class="rebranding">
  <nav>
    <ul class="pagination">
      <li class="page-item disabled">
        <a class="page-link" href="#">«</a>
      </li>
      <li class="page-item active">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">»</a>
      </li>
    </ul>
  </nav>
</div>`,
        `import { Pagination } from '@legalops/ui';

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
/>`,
        ''
      )}
    </section>
  `;
}

function paginaDropdown() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Dropdowns</h2>
      <p class="secao-descricao">Menus suspensos para ações e navegação contextual.</p>
      
      ${componenteComCodigo('Dropdown Básico',
        `<div class="dropdown">
          <button class="btn btn-primary" onclick="this.nextElementSibling.classList.toggle('show')">
            Dropdown ▼
          </button>
          <div class="dropdown-menu show" style="position: relative; display: block; margin-top: 8px;">
            <a class="dropdown-item" href="#">Ação 1</a>
            <a class="dropdown-item" href="#">Ação 2</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Outra ação</a>
          </div>
        </div>`,
        `<div class="rebranding">
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
      Dropdown
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Ação 1</a></li>
      <li><a class="dropdown-item" href="#">Ação 2</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#">Outra ação</a></li>
    </ul>
  </div>
</div>`,
        `import { Dropdown } from '@legalops/ui';

<Dropdown>
  <Dropdown.Toggle>Dropdown</Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item onClick={handleAcao1}>Ação 1</Dropdown.Item>
    <Dropdown.Item onClick={handleAcao2}>Ação 2</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item>Outra ação</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>`,
        ''
      )}
    </section>
  `;
}

function paginaTabelas() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Tabelas</h2>
      <p class="secao-descricao">Tabelas para exibição de dados tabulares.</p>
      
      ${componenteComCodigo('Tabela Básica',
        `<table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>João Silva</td>
              <td>joao@email.com</td>
              <td><span class="badge badge-primary">Ativo</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Maria Santos</td>
              <td>maria@email.com</td>
              <td><span class="badge badge-secondary">Pendente</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Pedro Costa</td>
              <td>pedro@email.com</td>
              <td><span class="badge badge-tertiary">Inativo</span></td>
            </tr>
          </tbody>
        </table>`,
        `<div class="rebranding">
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>João Silva</td>
        <td>joao@email.com</td>
        <td><span class="badge bg-primary">Ativo</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
        `import { Table } from '@legalops/ui';

<Table
  columns={[
    { key: 'id', label: '#' },
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' }
  ]}
  data={dados}
/>`,
        ''
      )}

      ${componenteComCodigo('Tabela com Hover',
        `<table class="table table-hover">
          <thead>
            <tr><th>Produto</th><th>Preço</th></tr>
          </thead>
          <tbody>
            <tr><td>Produto A</td><td>R$ 100,00</td></tr>
            <tr><td>Produto B</td><td>R$ 200,00</td></tr>
            <tr><td>Produto C</td><td>R$ 300,00</td></tr>
          </tbody>
        </table>`,
        `<div class="rebranding">
  <table class="table table-hover">
    <thead>
      <tr><th>Produto</th><th>Preço</th></tr>
    </thead>
    <tbody>
      <tr><td>Produto A</td><td>R$ 100,00</td></tr>
      <tr><td>Produto B</td><td>R$ 200,00</td></tr>
    </tbody>
  </table>
</div>`,
        `<Table hoverable columns={...} data={...} />`,
        'Adicione .table-hover para highlight no hover'
      )}
    </section>
  `;
}

function paginaListGroup() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">List Group</h2>
      <p class="secao-descricao">Listas estilizadas para exibição de itens.</p>
      
      ${componenteComCodigo('List Group Básico',
        `<div class="list-group" style="max-width: 400px;">
          <div class="list-group-item active">Item ativo</div>
          <div class="list-group-item">Item 2</div>
          <div class="list-group-item">Item 3</div>
          <div class="list-group-item">Item 4</div>
        </div>`,
        `<div class="rebranding">
  <ul class="list-group">
    <li class="list-group-item active">Item ativo</li>
    <li class="list-group-item">Item 2</li>
    <li class="list-group-item">Item 3</li>
    <li class="list-group-item">Item 4</li>
  </ul>
</div>`,
        `import { ListGroup } from '@legalops/ui';

<ListGroup>
  <ListGroup.Item active>Item ativo</ListGroup.Item>
  <ListGroup.Item>Item 2</ListGroup.Item>
  <ListGroup.Item>Item 3</ListGroup.Item>
</ListGroup>`,
        ''
      )}

      ${componenteComCodigo('Com Ação (Clicável)',
        `<div class="list-group" style="max-width: 400px;">
          <div class="list-group-item list-group-item-action">Item clicável 1</div>
          <div class="list-group-item list-group-item-action">Item clicável 2</div>
          <div class="list-group-item list-group-item-action">Item clicável 3</div>
        </div>`,
        `<div class="rebranding">
  <div class="list-group">
    <a href="#" class="list-group-item list-group-item-action">Item clicável 1</a>
    <a href="#" class="list-group-item list-group-item-action">Item clicável 2</a>
    <a href="#" class="list-group-item list-group-item-action">Item clicável 3</a>
  </div>
</div>`,
        `<ListGroup>
  <ListGroup.Item action onClick={...}>Item clicável 1</ListGroup.Item>
  <ListGroup.Item action onClick={...}>Item clicável 2</ListGroup.Item>
</ListGroup>`,
        ''
      )}
    </section>
  `;
}

function paginaHelpers() {
  return `
    <section class="secao">
      <h2 class="secao-titulo">Classes Utilitárias</h2>
      <p class="secao-descricao">Classes auxiliares para ajustes rápidos de layout, texto e cores.</p>
      
      <div class="card-componente">
        <div class="card-componente-header"><div class="card-componente-titulo">Texto</div></div>
        <div class="card-componente-preview">
          <table class="table">
            <thead><tr><th>Classe</th><th>Descrição</th></tr></thead>
            <tbody>
              <tr><td><code>.text-primary</code></td><td>Texto na cor primária (#E5293F)</td></tr>
              <tr><td><code>.text-secondary</code></td><td>Texto na cor secundária (#ACBAC2)</td></tr>
              <tr><td><code>.text-tertiary</code></td><td>Texto na cor terciária (#7F919A)</td></tr>
              <tr><td><code>.text-muted</code></td><td>Texto em cinza suave</td></tr>
              <tr><td><code>.text-start</code></td><td>Alinhamento à esquerda</td></tr>
              <tr><td><code>.text-center</code></td><td>Alinhamento centralizado</td></tr>
              <tr><td><code>.text-end</code></td><td>Alinhamento à direita</td></tr>
              <tr><td><code>.fw-bold</code></td><td>Texto em negrito</td></tr>
              <tr><td><code>.fw-normal</code></td><td>Texto normal</td></tr>
              <tr><td><code>.fst-italic</code></td><td>Texto em itálico</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card-componente">
        <div class="card-componente-header"><div class="card-componente-titulo">Background</div></div>
        <div class="card-componente-preview">
          <table class="table">
            <thead><tr><th>Classe</th><th>Descrição</th></tr></thead>
            <tbody>
              <tr><td><code>.bg-primary</code></td><td>Fundo na cor primária</td></tr>
              <tr><td><code>.bg-secondary</code></td><td>Fundo na cor secundária</td></tr>
              <tr><td><code>.bg-tertiary</code></td><td>Fundo na cor terciária</td></tr>
              <tr><td><code>.bg-light</code></td><td>Fundo claro</td></tr>
              <tr><td><code>.bg-dark</code></td><td>Fundo escuro</td></tr>
              <tr><td><code>.bg-white</code></td><td>Fundo branco</td></tr>
              <tr><td><code>.bg-transparent</code></td><td>Fundo transparente</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card-componente">
        <div class="card-componente-header"><div class="card-componente-titulo">Display</div></div>
        <div class="card-componente-preview">
          <table class="table">
            <thead><tr><th>Classe</th><th>Descrição</th></tr></thead>
            <tbody>
              <tr><td><code>.d-none</code></td><td>display: none</td></tr>
              <tr><td><code>.d-block</code></td><td>display: block</td></tr>
              <tr><td><code>.d-inline</code></td><td>display: inline</td></tr>
              <tr><td><code>.d-inline-block</code></td><td>display: inline-block</td></tr>
              <tr><td><code>.d-flex</code></td><td>display: flex</td></tr>
              <tr><td><code>.d-grid</code></td><td>display: grid</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card-componente">
        <div class="card-componente-header"><div class="card-componente-titulo">Flexbox</div></div>
        <div class="card-componente-preview">
          <table class="table">
            <thead><tr><th>Classe</th><th>Descrição</th></tr></thead>
            <tbody>
              <tr><td><code>.justify-content-start</code></td><td>Início</td></tr>
              <tr><td><code>.justify-content-center</code></td><td>Centro</td></tr>
              <tr><td><code>.justify-content-end</code></td><td>Fim</td></tr>
              <tr><td><code>.justify-content-between</code></td><td>Espaço entre</td></tr>
              <tr><td><code>.align-items-start</code></td><td>Alinha no topo</td></tr>
              <tr><td><code>.align-items-center</code></td><td>Alinha no centro</td></tr>
              <tr><td><code>.align-items-end</code></td><td>Alinha embaixo</td></tr>
              <tr><td><code>.gap-1</code> a <code>.gap-5</code></td><td>Espaçamento entre itens</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card-componente">
        <div class="card-componente-header"><div class="card-componente-titulo">Bordas</div></div>
        <div class="card-componente-preview">
          <table class="table">
            <thead><tr><th>Classe</th><th>Descrição</th></tr></thead>
            <tbody>
              <tr><td><code>.border</code></td><td>Borda em todos os lados</td></tr>
              <tr><td><code>.border-0</code></td><td>Remove bordas</td></tr>
              <tr><td><code>.border-primary</code></td><td>Borda na cor primária</td></tr>
              <tr><td><code>.rounded</code></td><td>Border-radius padrão</td></tr>
              <tr><td><code>.rounded-pill</code></td><td>Border-radius arredondado (pill)</td></tr>
              <tr><td><code>.rounded-circle</code></td><td>Border-radius circular</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

// Importar estilos (o Vite processará o SCSS)
import './scss/design-system.scss';
import './css/documentacao-layout.css';
import 'flatpickr/dist/flatpickr.min.css';

// Importar JS do Design System (inclui Bootstrap e Patches)
import './js/design-system.js';
import flatpickr from 'flatpickr';
window.flatpickr = flatpickr;

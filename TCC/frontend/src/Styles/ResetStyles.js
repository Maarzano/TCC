// src/styles/ResetStyles.js
import { createGlobalStyle } from 'styled-components';

export const ResetStyles = createGlobalStyle`
  /* Box sizing */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Remove margens e paddings padrão */
  body, h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd {
    margin: 0;
    padding: 0;
  }


  /* Remove listas com estilo padrão */
  ul[role='list'],
  ol[role='list'] {
    list-style: none;
  }

  /* Setar altura mínima para o body */
  html, body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    height: 100%;
    background-color: #1a1a1a;
  }

  html, body, #root {
    background-color: #1a1a1a;
    min-height: 100%;
  }

  /* Tipografia consistente */
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #000;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  /* Remove estilos de links */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Imagens responsivas */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* Remove herança de formatação para elementos de formulário */
  input, button, textarea, select {
    font: inherit;
    outline: none;
    border: none;
    background: none;
  }

  /* Botão com cursor */
  button {
    cursor: pointer;
  }

  /* Redefine tabelas */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --color-black: #000000;
    --color-white: #ffffff;
    --color-background: #ffffff;
    --color-background-user: #515151;
    --color-input: #dadada;
    --color-text: #dadada;
    --color-grey: #666666;
    --color-grey-user: #515151;
    --color-grey-medium: #999999;
    --color-grey-light: #dadada;
    --color-grey-low: #e1e1e1;
    --color-yellow: #f0ab00;
    --color-red: #ff0000;
    --color-blue: #008fd3;
    --color-purple: #970a82;
    --color-orange: #e35500;
    --color-green: #4fb81c;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    @media (max-width: 1080px) {
      font-size: 93.75%
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--color-background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    box-shadow: 0 0 0 0;
    outline: 0;
    border: none;
    background-color: transparent;

  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button, input, select {
    cursor: pointer;

  }


  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  a {
    text-decoration: none;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px var(--color-background) inset;
    box-shadow: 0 0 0 30px var(--color-background) inset;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: var(--color-text) !important;
  }


  .modal {
    outline: none;
    height: 70%;
    margin: 0 auto;
    position: absolute;
    border: 3px solid var(--color-yellow);
    border-radius: 35px;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    width: 40%;

    @media (max-width: 900px) {
      width: 80%;
    }
  }

  .modal-share {
    outline: none;
    height: 30%;
    margin: 0 auto;
    position: absolute;
    border: 3px solid var(--color-yellow);
    border-radius: 35px;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    width: 40%;

    @media (max-width: 900px) {
      width: 80%;
    }
  }


  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .carousel * {
    z-index: -1;
  }
`;

export default GlobalStyle;

import { css } from 'styled-components';

export default {
  wrapper: css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    transition: all 0.4s ease-out;
  `,
  heading: css`
    font-weight: 300;
    text-align: center;
    margin-bottom: 3rem;
  `,
  closeButton: css`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: transparent;
    border: none;
    font-size: 1.6rem;
    line-height: 1;
    cursor: pointer;
  `,
  container: css`
    font-size: 1.2rem;
    z-index: 200;
    width: 30rem;
    border-radius: 3px;
    padding: 4rem 5rem;
    background-color: #ecf0f1;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `
};

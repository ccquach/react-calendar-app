import { css } from 'styled-components';

export default {
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
    font-size: 1.3rem;
    z-index: 200;
    width: 30rem;
    border-radius: 3px;
    padding: 4rem 5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: linear-gradient(to right bottom, #396afc, #2948ff);
    background-size: cover;
    background-position: center;
    color: #ecf0f1;
  `
};

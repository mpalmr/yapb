import React from 'react';
import css from 'styled-jsx/css';
import { Container } from 'react-bootstrap';


const containerCss = css.resolve`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #eee;
`;


function Footer() {
  return (
    <Container className={containerCss.className} as="footer" fluid>
      <a href="https://github.com/mpalmr/mpaste" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>

      <style jsx global>
        {`
          #__next {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
          }

          main {
            flex: 1;
          }
        `}
      </style>
      {containerCss.styles}
    </Container>
  );
}


export default Footer;

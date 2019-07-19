import React from 'react';
import PropTypes from 'prop-types';


function Container({ children }) {
  return (
    <div>
      {children}

      <style jsx>
        {`
          div {
            width: 100%;
          }

          @media (min-width: 576px) {
            div {
              max-width: 540px;
            }
          }

          @media (min-width: 768px) {
            div {
              max-width: 720px;
            }
          }

          @media (min-width: 1200px) {
            div {
              max-width: 1140px;
            }
          }
        `}
      </style>
    </div>
  );
}


Container.propTypes = {
  children: PropTypes.element.isRequired,
};


export default Container;

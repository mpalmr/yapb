import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import { CardDeck, Card, Button } from 'react-bootstrap';
import client from '../../client';


const cardFooterCss = css.resolve`
  text-align: right;
`;


function CurrentUserPastes(props) {
  const pastes = props.pastes.map(paste => ({
    ...paste,
    createdAt: new Date(paste.createdAt),
    updatedAt: new Date(paste.updatedAt),
    files: paste.files.map(file => ({
      ...file,
      updatedAt: new Date(file.updatedAt),
    })),
  }));


  return (
    <>
      <h1>Your Pastes</h1>

      {pastes.length ? (
        <CardDeck as="ul">
          {pastes.map(paste => (
            <Card key={paste.id} as="li">
              <Card.Body>
                <Card.Title>Placeholder name</Card.Title>
                <Card.Text>Created on: {paste.createdAt.toLocaleString()}</Card.Text>

                {paste.files.length} files:
                <ul>
                  {paste.files.map(file => (
                    <li key={file.id}>
                      {file.name}
                    </li>
                  ))}
                </ul>
              </Card.Body>

              <Card.Footer className={cardFooterCss.className}>
                <Button href={`/paste/${paste.id}`} variant="info" size="sm">
                  View
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </CardDeck>
      ) : (
        <p className="no-pastes-message">
          You have not created any pastes yet.
        </p>
      )}

      {cardFooterCss.styles}
    </>
  );
}


CurrentUserPastes.propTypes = {
  pastes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      contents: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};


CurrentUserPastes.getInitialProps = async function ({ res }) {
  return process.browser ? client.get('/paste') : res.locals;
};


export default CurrentUserPastes;

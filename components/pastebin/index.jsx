import React from 'react';
import css from 'styled-jsx/css';
import { Container, Form, Button } from 'react-bootstrap';
import client from '../../client';
import useFiles from './use-files';
import File from './file';


const controlsCss = css.resolve`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
`;


export default function Pastebin() {
  const { files, addFile } = useFiles();


  async function handleSubmit(event) {
    event.preventDefault();
    return client
      .post('/paste', files.map(({ id, ...file }) => file))
      .then((res) => {
        console.log(res);
        return res;
      });
  }


  return (
    <Container>
      <Form method="post" action="/" onSubmit={handleSubmit} noValidate>
        {files.map(({ id, ...file }) => (
          <File
            key={id}
            {...file}
            canRemove={files.length > 1}
          />
        ))}

        <div className={controlsCss.className}>
          <Button onClick={addFile}>Add File</Button>
          <Button type="submit">Paste</Button>
        </div>
      </Form>

      <style jsx global>
        {`
          .${controlsCss.className} button:not(:last-child) {
            margin-right: .5rem;
          }
        `}
      </style>
      {controlsCss.styles}
    </Container>
  );
}

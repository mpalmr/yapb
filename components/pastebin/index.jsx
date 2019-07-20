import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import client from '../../client';
import useFiles from './use-files';
import File from './file';


export default function Pastebin() {
  const { files, addFile } = useFiles();


  async function handleSubmit(event) {
    event.preventDefault();
    console.log(files);

    return client
      .post('/', files.map(({ id, ...file }) => file))
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

        <Button onClick={addFile}>Add File</Button>
        <Button type="submit">Paste</Button>
      </Form>
    </Container>
  );
}

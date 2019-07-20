import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import client from '../../client';
import useFiles from './use-files';
import File from './file';


export default function Pastebin() {
  const { files, addFile, removeFile } = useFiles();


  async function handleSubmit(values) {
    return client
      .post('/', values)
      .then((res) => {
        console.log(res);
        return res;
      });
  }


  return (
    <Container>
      <Form method="post" action="/" onSubmit={handleSubmit} noValidate>
        {files.map((file, i) => (
          <File
            {...file}
            remove={() => removeFile(i)}
          />
        ))}

        <Button onClick={addFile}>Add File</Button>
        <Button type="submit">Paste</Button>
      </Form>
    </Container>
  );
}

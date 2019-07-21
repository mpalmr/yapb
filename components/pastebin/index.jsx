import React, { useContext, useState } from 'react';
import css from 'styled-jsx/css';
import Router from 'next/router';
import { Container, Form, Button } from 'react-bootstrap';
import { NotificationsContext } from '../providers/notifications';
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
  const dispatchNotification = useContext(NotificationsContext);
  const { files, addFile } = useFiles();
  const [submitting, setSubmitting] = useState(false);


  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    return client
      .post('/paste', files.map(({ id, ...file }) => file))
      .then(({ pasteId }) => {
        Router.push(`/paste/${pasteId}`);
        return pasteId;
      })
      .catch((error) => {
        dispatchNotification('error', 'Unable to submit paste.');
        return Promise.reject(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }


  return (
    <Container>
      <Form method="post" action="/" onSubmit={handleSubmit} noValidate>
        {files.map(({ id, ...file }) => (
          <File
            key={id}
            {...file}
            disabled={submitting}
            canRemove={files.length > 1}
          />
        ))}

        <div className={controlsCss.className}>
          <Button disabled={submitting} onClick={addFile}>Add File</Button>
          <Button type="submit" disabled={submitting}>Paste</Button>
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

import React, { useState } from 'react';
import axios from 'axios';


export default function Pastebin() {
  const [contents, setContents] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    return axios
      .post('/', { contents })
      .then((res) => {
        console.log(res);
        return res;
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }


  return (
    <form method="post" action="/" onSubmit={handleSubmit}>
      <input
        name="contents"
        value={contents}
        disabled={isSubmitting}
        onChange={event => setContents(event.target.value)}
      />
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}

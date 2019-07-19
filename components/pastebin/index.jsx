import React, { useState } from 'react';


export default function Pastebin() {
  const [contents, setContents] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  }

  return (
    <form method="post" action="/" onSubmit={handleSubmit}>
      <input
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

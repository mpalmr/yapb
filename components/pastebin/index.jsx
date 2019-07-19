import React, { useState } from 'react';


export default function Pastebin() {
  const [contents, setContents] = useState('');

  return (
    <form method="post" action="/">
      <input
        value={contents}
        onChange={event => setContents(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

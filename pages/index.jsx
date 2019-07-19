import React from 'react';
import Header from '../components/header';
import Pastebin from '../components/pastebin';


export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Pastebin />
      </main>
    </>
  );
}

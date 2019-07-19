import React from 'react';
import Link from 'next/link';


export default function Header() {
  return (
    <header>
      <h1>mpaste</h1>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>

      <style jsx>
        {`
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        `}
      </style>
    </header>
  );
}

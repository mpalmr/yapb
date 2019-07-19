import React from 'react';
import Link from 'next/link';


export default function Header() {
  return (
    <header>
      <h1>mpaste</h1>

      <nav>
        <ul>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </li>
        </ul>
      </nav>

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

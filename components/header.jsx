import React from 'react';
import Link from 'next/link';
import { Navbar } from 'react-bootstrap';


export default function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
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
      </Navbar>
    </header>
  );
}

import React, { useContext } from 'react';
import css from 'styled-jsx/css';
import Link from 'next/link';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { UserContext } from './providers/user';


const navbarCss = css.resolve`
  justify-content: space-between;
`;

const navbarBrandCss = css.resolve`
  margin-right: 0;
  margin-bottom: 0;
`;

const navCss = css.resolve`
  align-items: center;
`;


function Header() {
  const { id, isLoggedIn } = useContext(UserContext);

  return (
    <Navbar className={navbarCss.className} as="header" bg="dark" variant="dark">
      <Link href="/">
        <a>
          <Navbar.Brand className={navbarBrandCss.className} as="h1">mpaste</Navbar.Brand>
        </a>
      </Link>

      <Nav className={navCss.className}>
        {isLoggedIn ? (
          <>
            <NavItem>
              <Link href="/">
                <a>New</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href={`/user/${id}`}>
                <a>Profile</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </NavItem>
          </>
        )}
      </Nav>

      <style jsx global>
        {`
          .${navbarCss.className} .nav-item:not(:last-child) {
            margin-right: .75rem;
          }
        `}
      </style>
      {navbarCss.styles}
      {navbarBrandCss.styles}
      {navCss.styles}
    </Navbar>
  );
}


export default Header;

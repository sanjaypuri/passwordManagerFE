import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
          Password Manager
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Passwords
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/newpassword">New Password</Link></li>
                <li><Link className="dropdown-item" to="/passwords">List Passwords</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Notes
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/newnote">New Note</Link></li>
                <li><Link className="dropdown-item" to="/notes">List Notes</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Wallets
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/newwallet">New Wallet</Link></li>
                <li><Link className="dropdown-item" to="/wallets">List Wallets</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

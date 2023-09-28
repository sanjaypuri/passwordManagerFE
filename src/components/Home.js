import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/Home.css';

export default function Home() {

  const [passwords, setPasswords] = useState([]);
  const [notes, setNotes] = useState([]);
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    (async () => await load())()
  }, []);

  async function load() {
    let result = await axios.get("https://passwordmanager-mjj4.onrender.com/api/passwords");
    setPasswords(result.data.data) 
    result = await axios.get("https://passwordmanager-mjj4.onrender.com/api/notes");
    setNotes(result.data.data) 
    result = await axios.get("https://passwordmanager-mjj4.onrender.com/api/wallets");
    setWallets(result.data.data) 
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="text-center mt-5">Password Manager</h1>
      <ul className="list-group w-50 mt-5" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Link className="text-decoration-none" to="/passwords"><li id="list" className="list-group-item d-flex justify-content-between align-items-center rounded mb-4">
          Passwords
          <span className="badge bg-primary rounded-pill">{passwords.length}</span>
        </li></Link>
        <Link className="text-decoration-none" to="/notes"><li id="list" className="list-group-item d-flex justify-content-between align-items-center rounded mb-4">
          Notes
          <span className="badge bg-primary rounded-pill">{notes.length}</span>
        </li></Link>
        <Link className="text-decoration-none" to="/wallets"><li id="list" className="list-group-item d-flex justify-content-between align-items-center rounded mb-4">
          Wallets
          <span className="badge bg-primary rounded-pill">{wallets.length}</span>
        </li></Link>
      </ul>
    </div>
  );
}

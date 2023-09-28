import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/Home.css';
import { useNavigate } from 'react-router-dom';

export default function Passwords() {

  const [passwords, setPasswords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://passwordmanager-mjj4.onrender.com/api/passwords")
      .then((res) => res.json())
      .then((data) => setPasswords(data.data));
  }, []);

  function handleClick(password){
    localStorage.setItem("id", password.id);
    localStorage.setItem("name", password.name);
    localStorage.setItem("website", password.website);
    localStorage.setItem("username", password.username);
    localStorage.setItem("password", password.password);
    localStorage.setItem("notes", password.notes);
  }

  function handleNew(){
    navigate('/newpassword');
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="text-center mt-2">Password Manager - Passwords</h1>
      <div className="d-flex justify-content-end">
        <button className="btn btn-sm btn-primary mb-2" onClick={handleNew}>New Password</button>
      </div>
      <ul className="list-group w-50 mt-1" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        {passwords.map(function fn(password) {
          return (
            <Link className="text-decoration-none" to="/password" onClick={()=>handleClick(password)}>
              <li id="list" className="list-group-item d-flex justify-content-between align-items-center rounded mb-2">
                <span>{password.name}</span>
                <span>{password.username}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}



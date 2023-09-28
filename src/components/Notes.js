import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../components/Home.css';

export default function Notes() {

  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://passwordmanager-mjj4.onrender.com/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data.data));
  }, []);

  function handleClick(note){
    localStorage.setItem("id", note.id);
    localStorage.setItem("name", note.name);
    localStorage.setItem("details", note.details);
  }

  function handleNew(){
    navigate('/newnote');
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="text-center mt-3">Password Manager - Notes</h1>
      <div className="d-flex justify-content-end">
        <button className="btn btn-sm btn-primary mb-2" onClick={handleNew}>New Note</button>
      </div>
      <ul className="list-group w-50 mt-2" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        {notes.map(function fn(note) {
          return (
            <Link className="text-decoration-none" to="/note" onClick={()=>handleClick(note)}>
              <li id="list" className="list-group-item d-flex justify-content-between align-items-center rounded mb-2">
                <span>{note.name}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}



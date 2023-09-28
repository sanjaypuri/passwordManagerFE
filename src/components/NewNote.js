import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function NewNote() {

  // const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const navigate = useNavigate();

  function handleBack() {
    navigate('/notes');
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    axios.post('https://passwordmanager-mjj4.onrender.com/api/newnote', { name, details })
      .then(res => {
        console.log(res);
        navigate('/notes');
      }).catch(err => console.log(err));
      toast.success("Note saved successfully");
  };

  function validateForm() {
    if (name === '') {
      toast.error("Name cannot be blank");
      return false;
    }
    return true;
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="text-center mt-3">Password Manager - New Note</h1>
      <div className="container w-50 shadow-lg" style={{ background: 'hsl(203, 92%, 90%)' }}>
        <div className="form-floating mb-3 mt-3">
          <input type="text" className="form-control" id="name" placeholder="Name" onChange={e => setName(e.target.value)} />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3">
          <textarea className="form-control" id="details" placeholder="Note" onChange={e => setDetails(e.target.value)} />
          <label htmlFor="details">Details</label>
        </div>
        <div className="mb-2 d-flex justify-content-around">
          <button id="btn" type="button" className="btn btn-primary w-25" onClick={handleSave}>Save</button>
          <button id="back" type="button" className="btn btn-primary w-25" onClick={handleBack}>Back</button>
        </div>
      </div>
    </div>
  );
}

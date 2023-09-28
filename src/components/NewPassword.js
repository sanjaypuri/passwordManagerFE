import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function NewPassword() {

  // const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  function handleBack() {
    navigate('/passwords');
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!validateForm()){
      return;
    }
    axios.post('https://passwordmanager-mjj4.onrender.com/api/newpassword', {name, website, username, password, notes})
    .then(res=>{
      console.log(res);
      navigate('/passwords');
    }).catch(err=>console.log(err));
    toast.success("Password saved successfully");
  };

  function validateForm(){
    if (name ===''){
      toast.error("Name cannot be blank");
      return false;
    }
    return true;
  };

  const handleShow = (event) => {
    event.preventDefault();
    const textBox = document.getElementById("password");
    const button = document.getElementById('button');
    if (textBox.type === "text") {
      textBox.type = "password";
      button.innerText = "Show Password"
    } else {
      textBox.type = "text";
      button.innerText = "Hide Password"
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="text-center mt-3">Password Manager - New Password</h1>
      <div className="container w-50 shadow-lg" style={{background:'hsl(203, 92%, 90%)'}}>
        <div className="form-floating mb-3 mt-3">
          <input type="text" className="form-control" id="name" placeholder="Name" onChange={e => setName(e.target.value)} />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="website" placeholder="Website" onChange={e => setWebsite(e.target.value)} />
          <label htmlFor="website">Website</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-3 d-flex">
          <input type="password" className="form-control w-75" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <label htmlFor="password">Password</label>
          <button id="button" class="ms-4 btn btn-light mb-2 me-4" onClick={handleShow}>Show Password</button>
        </div>
        <div className="form-floating mb-3">
          <textarea className="form-control" id="note" placeholder="Note" onChange={e => setNotes(e.target.value)} />
          <label htmlFor="note">Notes</label>
        </div>
        <div className="mb-2 d-flex justify-content-around">
          <button id="btn" type="button" className="btn btn-primary w-25" onClick={handleSave}>Save</button>
          <button id="back" type="button" className="btn btn-primary w-25" onClick={handleBack}>Back</button>
        </div>
      </div>
    </div>
  );
}

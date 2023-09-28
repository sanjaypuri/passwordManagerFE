import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function Password() {

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setWebsite(localStorage.getItem("website"));
    setUsername(localStorage.getItem("username"));
    setPassword(localStorage.getItem("password"));
    if (localStorage.getItem("notes") === 'null') {
      setNotes('');
    } else {
      setNotes(localStorage.getItem("notes"));
    }
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    const btn = document.getElementById("btn");
    if (btn.innerHTML === "Edit") {
      btn.innerHTML = "Update";
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-success");
      document.getElementById("name").disabled = false;
      document.getElementById("website").disabled = false;
      document.getElementById("username").disabled = false;
      document.getElementById("password").disabled = false;
      document.getElementById("note").disabled = false;
    } else {
      if (!validateForm()) {
        return;
      }
      axios.patch('https://passwordmanager-mjj4.onrender.com/api/updatepassword', { id: id, name: name, website: website, username: username, password: password, notes: notes })
        .then(res => {
          console.log(res);
          navigate('/passwords');
        }).catch(err => console.log(err));
        toast.success("Password updated successfully");
    }
  };

  function validateForm(){
    if (name ===''){
      toast.error("Name cannot be blank");
      return false;
    }
    return true;
  };

  function handleBack() {
    navigate('/passwords');
  };

  const handleDelete = (id, event) => {
    // event.preventDefault();
    Swal.fire({
      title: 'Delete password?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://passwordmanager-mjj4.onrender.com/api/password/${id}`)
          .then(res => {
            console.log(res)
            navigate('/passwords');
          }).catch(err => console.log(err));
          toast.success("Password deleted successfully");
        }
    })
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
      <h1 className="text-center mt-3">Password Manager - Password Information</h1>
      <div className="container w-50 shadow-lg" style={{background:'hsl(203, 92%, 90%)'}}>
        <div className="form-floating mb-3 mt-3">
          <input type="text" className="form-control" id="name" value={name} placeholder="Name" disabled onChange={e => setName(e.target.value)} />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="website" value={website} placeholder="Website" disabled onChange={e => setWebsite(e.target.value)} />
          <label htmlFor="website">Website</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="username" value={username} placeholder="Username" disabled onChange={e => setUsername(e.target.value)} />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-3 d-flex">
          <input type="password" className="form-control w-75" id="password" value={password} placeholder="Password" disabled onChange={e => setPassword(e.target.value)} />
          <label htmlFor="password">Password</label>
          <button id="button" class="ms-4 btn btn-light mb-2 me-4" onClick={handleShow}>Show Password</button>
        </div>
        <div className="form-floating mb-3">
          <textarea className="form-control" id="note" value={notes} placeholder="Note" disabled onChange={e => setNotes(e.target.value)} />
          <label htmlFor="note">Notes</label>
        </div>
        <div className="mb-2 d-flex justify-content-around">
          <button id="btn" type="button" className="btn btn-primary w-25" onClick={handleClick}>Edit</button>
          <button id="delete" type="button" className="btn btn-danger w-25" onClick={() => handleDelete(id)}>Delete</button>
          <button id="back" type="button" className="btn btn-primary w-25" onClick={handleBack}>Back</button>
        </div>
      </div>
    </div>
  );
}

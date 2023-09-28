import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function Note() {

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setDetails(localStorage.getItem("details"));
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    const btn = document.getElementById("btn");
    if (btn.innerHTML === "Edit") {
      btn.innerHTML = "Update";
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-success");
      document.getElementById("name").disabled = false;
      document.getElementById("details").disabled = false;
    } else {
      if (!validateForm()) {
        return;
      }
      axios.patch('https://passwordmanager-mjj4.onrender.com/api/updatenote', { id: id, name: name, details: details })
        .then(res => {
          console.log(res);
        }).catch(err => console.log(err));
        navigate('/notes');
        toast.success("Note updated successfully");
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
    navigate('/notes');
  };

  const handleDelete = (id, event) => {
    // event.preventDefault();
    Swal.fire({
      title: 'Delete note?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://passwordmanager-mjj4.onrender.com/api/note/${id}`)
          .then(res => {
            console.log(res)
            navigate('/notes');
          }).catch(err => console.log(err));
          toast.success("Note deleted Successfully");
          // Swal.fire({
          //   position: 'top-end',
          //   icon: 'success',
          //   title: 'Note has been deleted',
          //   showConfirmButton: false,
          //   timer: 1500
          // });
          }
    })
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="text-center mt-3">Password Manager - Note Information</h1>
      <div className="container w-50 shadow-lg"  style={{background:'hsl(203, 92%, 90%)'}}>
        <div className="form-floating mb-3 mt-3">
          <input type="text" className="form-control" id="name" value={name} placeholder="Name" disabled onChange={e => setName(e.target.value)} />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3">
          <textarea className="form-control" id="details" value={details} placeholder="Note" disabled onChange={e => setDetails(e.target.value)} />
          <label htmlFor="details">Details</label>
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function Wallet() {

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [cardno, setCardno] = useState('');
  const [validfrom, setValidfrom] = useState('');
  const [validto, setValidto] = useState('');
  const [holdername, setHoldername] = useState('');
  const [cvc, setCvc] = useState('');
  const [pin, setPin] = useState('');
  const [bank, setBank] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setCardno(localStorage.getItem("cardno"));
    setValidfrom(localStorage.getItem("validfrom"));
    setValidto(localStorage.getItem("validto"));
    setHoldername(localStorage.getItem("holdername"));
    setCvc(localStorage.getItem("cvc"));
    setPin(localStorage.getItem("pin"));
    setBank(localStorage.getItem("bank"));
    setNotes(localStorage.getItem("notes"));
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    const btn = document.getElementById("btn");
    if (btn.innerHTML === "Edit") {
      btn.innerHTML = "Update";
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-success");
      document.getElementById("name").disabled = false;
      document.getElementById("cardno").disabled = false;
      document.getElementById("validfrom").disabled = false;
      document.getElementById("validto").disabled = false;
      document.getElementById("holdername").disabled = false;
      document.getElementById("cvc").disabled = false;
      document.getElementById("pin").disabled = false;
      document.getElementById("bank").disabled = false;
      document.getElementById("notes").disabled = false;
    } 
    else {
      if (!validateForm()) {
        return;
      }
      axios.patch('https://passwordmanager-mjj4.onrender.com/api/updatewallet', {
        id: id,
        name: name,
        cardno: cardno,
        validfrom: validfrom,
        validto: validto,
        holdername: holdername,
        cvc: cvc,
        pin: pin,
        bank: bank,
        notes: notes
      })
        .then(res => {
          console.log(res);
        }).catch(err => console.log(err));
      navigate('/wallets');
      toast.success("Wallet saved successfully");
    }
  };

  function validateForm() {
    if (name === '') {
      toast.error("Name cannot be blank");
      return false;
    }
    if (cardno === '') {
      toast.error("Card number cannot be blank");
      return false;
    }
    if (validto === '') {
      toast.error("Valid To cannot be blank");
      return false;
    }
    if (holdername === '') {
      toast.error("Holder Name cannot be blank");
      return false;
    }
    if (cvc === '') {
      toast.error("CVV cannot be blank");
      return false;
    }
    const checkCardNo = /^4[0-9]{12}(?:[0-9]{3})?$/;
    if(!document.getElementById("cardno").value.match(checkCardNo)){
      toast.error("You have entered an invalid Card Number");
      return false;
    }
    const checkCvc = /^\d{3}$/;
    if(!document.getElementById("cvc").value.match(checkCvc)){
      toast.error("CVV must be a 3 digit number");
      return false;
    }
    const checkPin = /^\d{4}|\d{6}$/;
    if(!document.getElementById("pin").value.match(checkPin)){
      toast.error("PIN must be 4 or 6 digit number");
      return false;
    }
    const checkValidMonth = /^[a-zA-Z]{3,4}[-][\d]{4}$/;
    if(document.getElementById("validfrom").value !== ""){
      if(!document.getElementById("validfrom").value.match(checkValidMonth)){
        toast.error("Valid From must be in format 'mmm-yyyy'");
        return false;
      }
    }
    if(!document.getElementById("validto").value.match(checkValidMonth)){
      toast.error("Valid To must be in format 'mmm-yyyy'");
      return false;
    }
    return true;
  };

  function handleBack() {
    navigate('/wallets');
  };

  const handleDelete = (id, event) => {
    // event.preventDefault();
    Swal.fire({
      title: 'Delete Wallet?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://passwordmanager-mjj4.onrender.com/api/wallet/${id}`)
          .then(res => {
            console.log(res)
            navigate('/wallets');
          }).catch(err => console.log(err));
          toast.success("Wallet deleted successfully");
      }
    })
  };

  const handleShow = (event) => {
    event.preventDefault();
    const button = document.getElementById('button');
    if (document.getElementById("cardno").type === "text") {
      document.getElementById("cardno").type = "password"
      document.getElementById("cvc").type = "password"
      document.getElementById("pin").type = "password"
      button.innerText = "Show Password"
    } else {
      document.getElementById("cardno").type = "text"
      document.getElementById("cvc").type = "text"
      document.getElementById("pin").type = "text"
      button.innerText = "Hide Password"
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="text-center mt-2 mb-4">Password Manager - Wallet Information</h1>
      <form className="row g-3 shadow pt-2" style={{ backgroundColor:'hsl(203, 92%, 90%)' }}>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} disabled onChange={e => setName(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="cardno" className="form-label">Card Number</label>
          <input type="password" className="form-control" id="cardno" value={cardno} disabled onChange={e => setCardno(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="validfrom" className="form-label">Valid From</label>
          <input type="text" className="form-control" id="validfrom" value={validfrom} disabled onChange={e => setValidfrom(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="validto" className="form-label">Valid To</label>
          <input type="text" className="form-control" id="validto" value={validto} disabled onChange={e => setValidto(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="cvc" className="form-label">CVV</label>
          <input type="password" className="form-control" id="cvc" value={cvc} disabled onChange={e => setCvc(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="pin" className="form-label">PIN</label>
          <input type="password" className="form-control" id="pin" value={pin} disabled onChange={e => setPin(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="bank" className="form-label">Bank</label>
          <input type="text" className="form-control" id="bank" value={bank} disabled onChange={e => setBank(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="holdername" className="form-label">Card Holder </label>
          <input type="text" className="form-control" id="holdername" value={holdername} disabled onChange={e => setHoldername(e.target.value)} />
        </div>
        <div className="col-md-12">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea className="form-control" id="notes" value={notes} disabled onChange={e => setNotes(e.target.value)} />
        </div>
        <div className="col-12 mb-2 d-flex justify-content-around">
          <button id="btn" type="button" className="btn btn-primary" style={{width:'20%'}} onClick={handleClick}>Edit</button>
          <button id="delete" type="button" className="btn btn-danger" style={{width:'20%'}} onClick={() => handleDelete(id)}>Delete</button>
          <button id="back" type="button" className="btn btn-primary" style={{width:'20%'}} onClick={handleBack}>Back</button>
          <button id="button" type="button" className="btn btn-primary" style={{width:'20%'}} onClick={handleShow}>Show All Passwords</button>
        </div>
      </form>
    </div>
  );
}


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function NewWallet() {

  // const [id, setId] = useState(0);
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

  function handleBack() {
    navigate('/wallets');
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    axios.post('https://passwordmanager-mjj4.onrender.com/api/newwallet', { name, cardno, validfrom, validto, holdername, cvc, pin, bank, notes })
      .then(res => {
        console.log(res);
        navigate('/wallets');
      }).catch(err => console.log(err));
      toast.success("Wallet saved successfully")
  };

  function validateForm() {
    if (name === '') {
      toast.error("Name cannot be blank");
      return false;
    }
    if (cardno === '') {
      toast.error("Carn number cannot be blank");
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
    if (!document.getElementById("cardno").value.match(checkCardNo)) {
      toast.error("You have entered an invalid Card Number");
      return false;
    }
    const checkCvc = /^\d{3}$/;
    if (!document.getElementById("cvc").value.match(checkCvc)) {
      toast.error("CVV must be a 3 digit number");
      return false;
    }
    const checkPin = /^\d{4}|\d{6}$/;
    if (!document.getElementById("pin").value.match(checkPin)) {
      toast.error("PIN must be 4 or 6 digit number");
      return false;
    }
    const checkValidMonth = /^[a-zA-Z]{3,4}[-][\d]{4}$/;
    if (document.getElementById("validfrom").value !== "") {
      if (!document.getElementById("validfrom").value.match(checkValidMonth)) {
        toast.error("Valid From must be in format 'mmm-yyyy'");
        return false;
      }
    }
    if (!document.getElementById("validto").value.match(checkValidMonth)) {
      toast.error("Valid To must be in format 'mmm-yyyy'");
      return false;
    }
    return true;
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
    <div>
      <div className="container d-flex flex-column justify-content-center">
        <h1 className="text-center mt-2 mb-4">Password Manager - New Wallet</h1>
        <form className="row g-3 shadow pt-2" style={{ backgroundColor: 'hsl(203, 92%, 90%)' }}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" onChange={e => setName(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="cardno" className="form-label">Card Number</label>
            <input type="password" className="form-control" id="cardno" onChange={e => setCardno(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label htmlFor="validfrom" className="form-label">Valid From</label>
            <input type="text" className="form-control" id="validfrom" onChange={e => setValidfrom(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label htmlFor="validto" className="form-label">Valid To</label>
            <input type="text" className="form-control" id="validto" onChange={e => setValidto(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label htmlFor="cvc" className="form-label">CVV</label>
            <input type="password" className="form-control" id="cvc" onChange={e => setCvc(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label htmlFor="pin" className="form-label">PIN</label>
            <input type="password" className="form-control" id="pin" onChange={e => setPin(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="bank" className="form-label">Bank</label>
            <input type="text" className="form-control" id="bank" onChange={e => setBank(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="holdername" className="form-label">Card Holder</label>
            <input type="text" className="form-control" id="holdername" onChange={e => setHoldername(e.target.value)} />
          </div>
          <div className="col-md-12">
            <label htmlFor="notes" className="form-label">Notes</label>
            <textarea className="form-control" id="notes" onChange={e => setNotes(e.target.value)} />
          </div>
          <div className="col-12 mb-2 d-flex justify-content-around">
            <button id="btn" type="button" className="btn btn-primary w-25" onClick={handleSave}>Save</button>
            <button id="back" type="button" className="btn btn-primary w-25" onClick={handleBack}>Back</button>
            <button id="button" type="button" className="btn btn-primary w-25" onClick={handleShow}>Show All Passwords</button>
          </div>
        </form>
      </div>
    </div>
  );
}

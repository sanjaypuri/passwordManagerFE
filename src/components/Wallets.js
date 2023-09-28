import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../components/Home.css';

export default function Wallets() {

  const [wallets, setWallets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://passwordmanager-mjj4.onrender.com/api/wallets")
      .then((res) => res.json())
      .then((data) => setWallets(data.data));
  }, []);

  function handleClick(wallet){
    localStorage.setItem("id", wallet.id);
    localStorage.setItem("name", wallet.name);
    localStorage.setItem("cardno", wallet.cardno);
    localStorage.setItem("validfrom", wallet.validfrom);
    localStorage.setItem("validto", wallet.validto);
    localStorage.setItem("holdername", wallet.holdername);
    localStorage.setItem("cvc", wallet.cvc);
    localStorage.setItem("pin", wallet.pin);
    localStorage.setItem("bank", wallet.bank);
    localStorage.setItem("notes", wallet.notes);
  }

  function handleNew(){
    navigate('/newwallet');
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h1 className="text-center mt-3">Password Manager - Wallets</h1>
      <div className="d-flex justify-content-end">
        <button className="btn btn-sm btn-primary mb-2" onClick={handleNew}>New Wallet</button>
      </div>
      <ul className="list-group w-50 mt-2" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        {wallets.map(function fn(wallet) {
          return (
            <Link className="text-decoration-none" to="/wallet" onClick={()=>handleClick(wallet)}>
              <li id="list" className="list-group-item d-flex justify-content-between align-items-center rounded mb-2">
                <span>{wallet.name}</span>
                <span>{wallet.holdername} </span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}



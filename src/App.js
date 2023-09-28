import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Passwords from './components/Passwords';
import Notes from './components/Notes';
import Note from './components/Note';
import Wallets from './components/Wallets';
import Password from './components/Password';
import NewPassword from './components/NewPassword';
import Wallet from './components/Wallet';
import NewNote from './components/NewNote';
import NewWallet from './components/NewWallet';

function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/passwords" element={<Passwords/>}/>
          <Route path="/password" element={<Password/>}/>
          <Route path="/newpassword" element={<NewPassword/>}/>
          <Route path="/notes" element={<Notes/>}/>
          <Route path="/note" element={<Note/>}/>
          <Route path="/newnote" element={<NewNote/>}/>
          <Route path="/wallets" element={<Wallets/>}/>
          <Route path="/wallet" element={<Wallet/>}/>
          <Route path="/newwallet" element={<NewWallet/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

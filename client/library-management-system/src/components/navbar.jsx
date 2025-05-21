import React from 'react';
import { FaHome, FaPlus } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar({ onAddClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => window.location.href = '/'}>
        <FaHome className="icon" />
        <h2>LIBRARIUM</h2>
      </div>
      <div className="navbar-right">
        <button className="add-btn" onClick={onAddClick}>
          <FaPlus className="icon" /> Add Book
        </button>
      </div>
    </nav>
  );
}

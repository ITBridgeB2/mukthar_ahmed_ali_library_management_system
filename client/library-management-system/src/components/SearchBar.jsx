import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/results?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by book name or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

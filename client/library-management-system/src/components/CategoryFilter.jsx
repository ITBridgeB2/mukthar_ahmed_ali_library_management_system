import React, { useState } from 'react';
import './CategoryFilter.css';

export default function CategoryFilter({ genres, authors, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="category-filter">
      <button className="toggle-btn" onClick={() => setOpen(!open)}>
        Browse by Category
      </button>

      {open && (
        <div className="category-box">
          <div>
            <h4>Genres</h4>
            <ul>
              {genres.map((g, i) => (
                <li key={i} onClick={() => onSelect('genre', g)}>{g}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Authors</h4>
            <ul>
              {authors.map((a, i) => (
                <li key={i} onClick={() => onSelect('author', a)}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

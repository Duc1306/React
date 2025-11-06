import React from "react";

function SearchForm({ onChangeValue }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Tìm theo name, username"
        onChange={(e) => onChangeValue(e.target.value)} // gọi hàm của App
      />
    </div>
  );
}

export default SearchForm;

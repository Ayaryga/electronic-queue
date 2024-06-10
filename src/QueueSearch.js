import React from 'react';

const QueueSearch = ({ searchTerm, setSearchTerm, clearSearch }) => {
  return (
    <div>
      <input
        type="text"
        id="searchInput"
        placeholder="Пошук за ім'ям"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-btn" onClick={() => setSearchTerm(searchTerm)}>Пошук</button>
      <button className="clear-search-btn" onClick={clearSearch}>Очистити пошук</button>
    </div>
  );
};

export default QueueSearch;

import React, { useState, useEffect } from 'react';
import QueueItem from './QueueItem';
import QueueSearch from './QueueSearch';
import './App.css';

const App = () => {
  const [queue, setQueue] = useState([]);
  const [highlighted, setHighlighted] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [scriptUrl, setScriptUrl] = useState('');

  useEffect(() => {
    if (scriptUrl) {
      fetchQueueData();
    }
  }, [scriptUrl]);

  const fetchQueueData = async () => {
    try {
      const response = await fetch(scriptUrl);
      const data = await response.json();
      setQueue(data.map(item => item.name));
      setHighlighted(new Array(data.length).fill(false));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const addToQueue = (name) => {
    setQueue([...queue, name]);
    setHighlighted([...highlighted, false]);
  };

  const removeFromQueue = (index) => {
    setQueue(queue.filter((_, i) => i !== index));
    setHighlighted(highlighted.filter((_, i) => i !== index));
    searchQueue(searchTerm); // Оновлюємо результати пошуку
  };

  const toggleHighlight = (index) => {
    setHighlighted(highlighted.map((hl, i) => (i === index ? !hl : hl)));
    clearSearch(); // Очищаємо результати пошуку при виділенні
  };

  const searchQueue = (term) => {
    setSearchTerm(term);
    setSearchResults(queue.filter(name => name.toLowerCase().includes(term.toLowerCase())));
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="app-container">
      <div className="queue-container">
        <h1>Електронна черга</h1>
        <input 
          type="text" 
          placeholder="Введіть URL Google Apps Script" 
          value={scriptUrl}
          onChange={(e) => setScriptUrl(e.target.value)}
        />
        <input 
          type="text" 
          id="nameInput" 
          placeholder="Ваше ім'я" 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const name = e.target.value.trim();
              if (name) {
                addToQueue(name);
                e.target.value = '';
              } else {
                alert('Будь ласка, введіть ваше ім\'я.');
              }
            }
          }}
        />
        <button 
          className="add-btn" 
          onClick={() => {
            const nameInput = document.getElementById('nameInput');
            const name = nameInput.value.trim();
            if (name) {
              addToQueue(name);
              nameInput.value = '';
            } else {
              alert('Будь ласка, введіть ваше ім\'я.');
            }
          }}
        >
          Додати в чергу
        </button>
        <QueueSearch searchTerm={searchTerm} setSearchTerm={searchQueue} clearSearch={clearSearch} />
        <h2>Поточна черга:</h2>
        <ul id="queueList" className="queue-list">
          {queue.map((name, index) => (
            <QueueItem
              key={index}
              name={name}
              index={index}
              highlighted={highlighted[index]}
              toggleHighlight={toggleHighlight}
              removeFromQueue={removeFromQueue}
            />
          ))}
        </ul>
      </div>

      <div className="search-results-container">
        <h2>Результати пошуку:</h2>
        <ul id="searchList" className="search-list">
          {searchResults.map((name, index) => {
            const queueIndex = queue.indexOf(name);
            return (
              <QueueItem
                key={queueIndex}
                name={name}
                index={queueIndex}
                highlighted={highlighted[queueIndex]}
                toggleHighlight={toggleHighlight}
                removeFromQueue={removeFromQueue}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;

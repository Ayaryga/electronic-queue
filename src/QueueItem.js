import React from 'react';

const QueueItem = ({ name, index, highlighted, toggleHighlight, removeFromQueue }) => {
  return (
    <li>
      <span onClick={() => toggleHighlight(index)} style={{ backgroundColor: highlighted ? 'yellow' : '' }}>
        {index + 1}. {name}
      </span>
      <button className="remove-btn" onClick={() => removeFromQueue(index)}>Видалити</button>
    </li>
  );
};

export default QueueItem;

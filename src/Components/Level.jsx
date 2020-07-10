import React from 'react';

const Level = ({ level, levelChange }) => {
  return (
    <>
      <select onChange={levelChange} value={level}>
        <option value="9">Easy</option>
        <option value="15">Medium</option>
        <option value="21">Hard</option>
      </select>
    </>
  );
};

export default Level;
import React from 'react';

const Level = ({ level, levelChange }) => {
  return (
    <>
      <select onChange={levelChange} value={level}>
        <option value="10">Easy</option>
        <option value="18">Medium</option>
        <option value="25">Hard</option>
      </select>
    </>
  );
};

export default Level;
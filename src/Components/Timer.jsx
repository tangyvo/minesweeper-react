import React from "react";

const Timer = ({ timer }) => {
  return (
    <p>
      <span className="emoji" role="img" aria-label="timer">
        ⏱️ </span>
      {timer === 0
        ? "000"
        : timer < 10
        ? "00" + timer + 's'
        : timer < 100
        ? "0" + timer + 's'
        : timer}
    </p>
  );
};

export default Timer;

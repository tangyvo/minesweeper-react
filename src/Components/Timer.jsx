import React from "react";

const Timer = ({ timer }) => {
  return (
    <p>
      <span role="img" aria-label="timer">
        ⏱️
      </span>
      {timer === 0
        ? "000"
        : timer < 10
        ? "00" + timer
        : timer < 100
        ? "0" + timer
        : timer}
    </p>
  );
};

export default Timer;

import React from "react";

const BestTime = ({ bestTime }) => (
  
    <p className="best-time">
      <span aria-label="timer" role="img">
        ⏱️{" "}
      </span>
      Best Time:
      {bestTime === 0 || bestTime === null
        ? ` ---`
        : bestTime < 10
        ? ` 00${bestTime}s`
        : bestTime < 100
        ? ` 0${bestTime}s`
        : ` ${bestTime}`}
    <br></br>
    <span>Right click to insert a flag</span>
    </p>
  
);

export default BestTime;

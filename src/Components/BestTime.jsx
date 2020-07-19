import React from "react";

// import react device detection
import { BrowserView, MobileView } from 'react-device-detect';

const BestTime = ({ bestTime }) => (
  <p className="best-time">
    {console.log("best time load")}
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
    <BrowserView>
      <span>Right click to insert a flag</span>
    </BrowserView>
    <MobileView>
      <span>Long press to insert a flag</span>
    </MobileView>
  </p>
);

export default React.memo(BestTime);

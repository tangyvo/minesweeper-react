import React from "react";

import { StyleGameOver } from "./Styles/StyleGameOver";

const GameOver = ({ gameOver, reset }) => {
  return (
    <>
      {gameOver ? (
        <StyleGameOver>
          Game Over
          <button onClick={reset}>Play Again</button>
        </StyleGameOver>
      ) : (
        ""
      )}
    </>
  );
};

export default GameOver;

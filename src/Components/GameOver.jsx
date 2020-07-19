import React from "react";

import { StyleGameOver } from "./Styles/StyleGameOver";

const GameOver = ({ gameOver, gameWon, reset }) => {
  return (
    <>
      {gameOver ? (
        <StyleGameOver>
          <h2>Game Over</h2>
          <button onClick={reset}>
            Play Again
          </button>
        </StyleGameOver>
      ) : gameWon ? (
        <StyleGameOver>
          <h2>You've Won</h2>
          <button onClick={reset}>
            Play Again
          </button>
        </StyleGameOver>
      ) : (
        ""
      )}
    </>
  );
};

export default GameOver;

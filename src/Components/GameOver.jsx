import React from "react";

import { StyleGameOver } from "./Styles/StyleGameOver";

const GameOver = ({ gameOver, gameWon, reset }) => {
  return (
    <>
      {gameOver ? (
        <StyleGameOver>
          GAME OVER
          <button onClick={reset}>Play Again</button>
        </StyleGameOver>
      ) : 
        gameWon ? (
          <StyleGameOver>
            YOU'VE WON
            <button onClick={reset}>Play Again</button>
          </StyleGameOver>
        ):
        ""
      }
    </>
  );
};

export default GameOver;

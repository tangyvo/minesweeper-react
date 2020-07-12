import React, { useState, useEffect } from "react";

// import styling
import { StyleMenu } from "./Components/Styles/StyleMenu";
import { StyleBody } from "./Components/Styles/StyleBody";

// import Components
import Game from "./Components/Game";
import Level from "./Components/Level";
import Flags from "./Components/Flags";
import Timer from "./Components/Timer";
import GameOver from "./Components/GameOver";

const App = () => {
  const [level, setLevel] = useState(9);
  const [grid, setGrid] = useState([]);
  const [bombs, setBombs] = useState([]);
  let bombCount = level * 2;
  const [clickCount, setClickCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // reset game when switching levels
  useEffect(() => {
    reset();
  }, [level]);

  const reset = () => {
    setGameOver(false);
    setGameWon(false);
    setIsPlaying(false);
    setClickCount(0);
    setTimer(0);
    calcBomb();
    updateGrid();
  };

  const levelChange = (e) => {
    setLevel(e.target.value);
  };

  const calcBomb = () => {
    const bombArr = [];
    const totalBlocks = level * level;
    while (bombArr.length < bombCount) {
      let randIndex = Math.floor(Math.random() * totalBlocks);
      if (!bombArr.includes(randIndex)) {
        bombArr.push(randIndex);
      }
    }
    setBombs(bombArr);
  };

  const updateGrid = () => {
    let gridCopy = [];
    for (let y = 0; y < level; y++) {
      gridCopy.push([]);
      for (let x = 0; x < level; x++) {
        gridCopy[y].push({
          index: y * level + x,
          y: y,
          x: x,
          isBomb: bombs.includes(y * level + x) ? true : false,
          isClicked: false,
          neighbourBombs: null,
        });
      }
    }
    setGrid([...gridCopy]);
  };

  const startTimer = () => {
    let countdown;
    if (!gameOver && !gameWon) {
      countdown = setInterval(() => {
        setTimer((prev) => Number(prev) + 1);
      }, 1000);
    } else {
      clearInterval(countdown);
      setTimer(0);
    }
  };

  const clickHandler = (e, y, x) => {
    e.stopPropagation();
    if (gameOver || gameWon) {
      startTimer();
      return;
    }
    if (!isPlaying) {
      setIsPlaying(true);
      startTimer();
    }
    calcNeighbourBombs(x, y);
    checkGameOver(y, x);
  };

  const checkGameOver = (y, x) => {
    let notClickedCount = level * level - bombCount - 1;
    if (grid[y][x].isBomb) {
      setGameOver(true);
    } else if (clickCount === notClickedCount) {
      setGameWon(true);
    }
  };

  const calcNeighbourBombs = (y, x) => {
    let gridCopy = JSON.parse(JSON.stringify(grid));

    let numBombs = 0;
    const yArr = [y - 1, y, y + 1];
    const xArr = [x - 1, x, x + 1];

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (
          yArr[j] < 0 ||
          xArr[i] < 0 ||
          yArr[j] > level - 1 ||
          xArr[i] > level - 1
        ) {
          break;
        } else if (gridCopy[xArr[i]][yArr[j]].isBomb) {
          numBombs++;
        }
        gridCopy[x][y].neighbourBombs = numBombs;
      }
      if (!gridCopy[x][y].isClicked) {
        gridCopy[x][y].isClicked = true;
        setClickCount((prev) => prev + 1);
      }
    }
    setGrid(gridCopy);
  };

  useEffect(() => {
    updateGrid();
  }, [bombs]);

  return (
    <>
      <StyleBody>
        <StyleMenu>
          <Level levelChange={levelChange} level={level} />
          <Flags />
          <Timer timer={timer} />
        </StyleMenu>
        <Game
          grid={grid}
          level={level}
          bombs={bombs}
          clickHandler={clickHandler}
          gameOver={gameOver}
        />
        <GameOver gameOver={gameOver} gameWon={gameWon} reset={reset} />
      </StyleBody>
    </>
  );
};

export default App;

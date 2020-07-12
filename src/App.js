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
  const bombCount = level * 2;
  const [clickCount, setClickCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  let countdown;

  // reset game when switching levels
  useEffect(() => {
    reset();
  }, [level]);

  const reset = () => {
    setBombs([]);
    setGameOver(false);
    setGameWon(false);
    setIsPlaying(false);
    setTimer(0);
    calcBomb();
    updateGrid();
  };

  useEffect(() => {
    clearInterval(countdown);
  }, [gameOver, gameWon])

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
    countdown = setInterval(() => {
      setTimer((prev) => Number(prev) + 1);
    }, 1000);
  };

  const clickHandler = (e, y, x) => {
    console.log(e.button);
    if (!isPlaying) {
      setIsPlaying(true);
      startTimer();
    }
    calcNeighbourBombs(x, y);
    checkGameOver(y, x);
  };

  const checkGameOver = (y, x) => {
    console.log("clickCount" + clickCount);
    let notClickedCount = level * level - bombCount - 1;
    console.log("notClickedCount:" + notClickedCount);
    if (grid[y][x].isBomb) {
      setGameOver(true);
    } else if (clickCount === notClickedCount) {
      console.log("won");
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
        if (yArr[j] < 0 || xArr[i] < 0 || yArr[j] > 8 || xArr[i] > 8) {
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

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
  let bombCount = 1;
  const [clickCount, setClickCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flagTotal, setFlagTotal] = useState(bombCount);
  const [emptyNeighbour, setEmptyNeighbour] = useState([]);
  // const [isDoubleClick, setIsDoubleClick] = useState(0);

  // reset game when switching levels
  useEffect(() => {
    reset();
  }, [level]);

  // start and end timer
  useEffect(() => {
    const countDown = setInterval(() => {
      // dont increment timer when player wins or loses
      if (gameOver || gameWon) {
        return;
      }
      // increment if game is in play
      else if (isPlaying) {
        setTimer((prev) => prev + 1);
      }
    }, 1000);

    // clean up timer when restarting game
    return () => clearInterval(countDown);
  }, [isPlaying]);

  // update grid once bombs have been re-calculated
  useEffect(() => {
    updateGrid();
  }, [bombs]);

  // funct that resets everything
  const reset = () => {
    setGameOver(false);
    setGameWon(false);
    setIsPlaying(false);
    setFlagTotal(bombCount);
    setClickCount(0);
    setTimer(0);
    calcBomb();
    updateGrid();
  };

  // set level state
  const levelChange = (e) => {
    setLevel(e.target.value);
  };

  // randomly generate x number of bombs depending on level and add to bomb array
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

  // update grid array and cell object
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
          isFlagged: false,
        });
      }
    }
    setGrid([...gridCopy]);
  };

  const clickHandler = (y, x) => {
    singleClick(y, x);
    // console.log(isDoubleClick);
    // setIsDoubleClick((prev) => prev + 1);
    // let timeout = setTimeout(() => {
    //   clicks(y, x);
    // if (isDoubleClick > 0) {
    //   addFlag(y, x);
    //   console.log("isDoubleClick");
    // } else {
    //   singleClick(y, x);
    //   console.log("single click", isDoubleClick);
    // }
    //   setIsDoubleClick(0);
    //   return clearTimeout(timeout);
    // }, 1000);
  };

  // const clicks = (y, x) => {
  //   if (isDoubleClick > 0) {
  //     addFlag(y, x);
  //   } else {
  //     singleClick(y, x);
  //   }
  // };

  // add and remove flag from grid object
  const rightClick = (e, y, x) => {
    e.persist();
    if (e.button !== 2) return;
    e.preventDefault();
    addFlag(y, x);
  };

  const addFlag = (y, x) => {
    let gridCopy = JSON.parse(JSON.stringify(grid));

    if (grid[y][x].isFlagged) {
      gridCopy[y][x].isFlagged = false;
      setFlagTotal((prev) => prev + 1);
    } else if (grid[y][x].isClicked === false) {
      gridCopy[y][x].isFlagged = true;
      setFlagTotal((prev) => prev - 1);
    }

    setGrid(gridCopy);
  };

  const singleClick = (y, x) => {
    // set playing to false when player loses or wins
    if (gameOver || gameWon) {
      setIsPlaying(false);
      return;
    }
    // on first turn set playing to true
    if (!isPlaying) {
      setIsPlaying(true);
    }
    // check no. of bombs nearby and if bomb was activated
    calcNeighbourBombs(x, y);
    checkGameOver(y, x);
  };

  // check if player has won or lost
  const checkGameOver = (y, x) => {
    let notClickedCount = level * level - bombCount - 1;
    if (grid[y][x].isBomb) {
      setGameOver(true);
      setIsPlaying(false);
    } else if (clickCount === notClickedCount) {
      setGameWon(true);
      setIsPlaying(false);
    }
  };

  const calcEmptyArea = () => {
    // 1. iterate through neighbours to find empty ones

    emptyNeighbour.forEach((neighbour, index) => {

      console.log(grid[neighbour[0]][neighbour[1]])
    });
    
  };

  const calcNeighbourBombs = (y, x) => {
    //  made deep copy of grid
    let gridCopy = JSON.parse(JSON.stringify(grid));

    let numBombs = 0;
    const yArr = [y - 1, y, y + 1];
    const xArr = [x - 1, x, x + 1];

    // loop through neighbouring cells and count how many contains bombs
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (grid[x][y].isFlagged) return;

        if (
          yArr[j] < 0 ||
          xArr[i] < 0 ||
          yArr[j] > level - 1 ||
          xArr[i] > level - 1 ||
          (i === 1 && j === 1)
        ) {
          continue;
        } else if (gridCopy[xArr[i]][yArr[j]].isBomb) {
          numBombs++;
        } 
        setEmptyNeighbour(prev => [...prev, [xArr[i], yArr[j]]]);
        gridCopy[x][y].neighbourBombs = numBombs;
      }
      if (!gridCopy[x][y].isClicked) {
        gridCopy[x][y].isClicked = true;
        setClickCount((prev) => prev + 1);
      }
    }

    if (numBombs === 0) {
      console.log("no bombs");
      console.log(emptyNeighbour);
      calcEmptyArea();
    } else {
      setEmptyNeighbour([]);
    }
    setGrid(gridCopy);
  };

  return (
    <>
      <StyleBody>
        <StyleMenu>
          <Level levelChange={levelChange} level={level} />
          <Flags flagTotal={flagTotal} />
          <Timer timer={timer} />
        </StyleMenu>
        <Game
          role="button"
          tabIndex="0"
          grid={grid}
          level={level}
          bombs={bombs}
          clickHandler={clickHandler}
          gameOver={gameOver}
          rightClick={rightClick}
        />
        <GameOver gameOver={gameOver} gameWon={gameWon} reset={reset} />
      </StyleBody>
    </>
  );
};

export default App;

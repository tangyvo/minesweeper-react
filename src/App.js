import React, { useState, useEffect } from "react";

// import styling
import { StyleMenu } from "./Components/Styles/StyleMenu";
import { StyleBody } from "./Components/Styles/StyleBody";

// import Components
import Game from "./Components/Game";
import Level from "./Components/Level";
import Flags from "./Components/Flags";
import Timer from "./Components/Timer";

const App = () => {
  const [level, setLevel] = useState(9);
  const [grid, setGrid] = useState([]);
  const [bombs, setBombs] = useState([]);

  const levelChange = (e) => {
    setLevel(e.target.value);
  };

  const calcBomb = () => {
    const bombArr = [];
    const totalBlocks = level * level;
    let bombTotal = 0;
    while (bombTotal < level) {
      let randIndex = Math.floor(Math.random() * totalBlocks);
      if (!bombArr.includes(randIndex)) {
        bombArr.push(randIndex);
        console.log('INCLUDE' + randIndex)
        bombTotal++;
      } else {
        console.log('EXCLUDE' + randIndex)
      }
    }
    setBombs(bombArr);
  };

  const outlineGrid = () => {
    let gridCopy = [];
    for (let y = 0; y < level; y++) {
      gridCopy.push([]);
      for (let x = 0; x < level; x++) {
        gridCopy[y].push({
          index: y * level + x,
          isBomb: bombs.includes(y * level + x) ? true : false,
          isClicked: false,
        });
      }
    }
    setGrid(gridCopy);
  };


  // useEffect(() => {
  //   calcBomb();
  //   outlineGrid();
  // }, []);
  
  useEffect(() => {
    calcBomb();
    outlineGrid();
  }, [level]);

  return (
    <StyleBody>
      <StyleMenu>
        <Level levelChange={levelChange} level={level} />
        <Flags />
        <Timer />
      </StyleMenu>
      <Game grid={grid} level={level} bombs={bombs} />
    </StyleBody>
  );
};

export default App;

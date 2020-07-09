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
  const [level, setLevel] = useState(10);

  const levelChange = (l) => {
    setLevel(l);
  };

  useEffect(() => {
    console.log(level);
  }, [level]);

  return (
    <StyleBody>
      <StyleMenu>
        <Level levelChange={levelChange} level={level} />
        <Flags />
        <Timer />
      </StyleMenu>
      <Game dimensions={level} />
    </StyleBody>
  );
};

export default App;

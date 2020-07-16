import React from "react";

const Flags = ({ flagTotal }) => {
  return (
    <p>
      <span role="img" aria-label="flag">🚩</span>
      {flagTotal}
    </p>
  );
};

export default Flags;

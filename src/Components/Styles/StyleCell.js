import styled from "styled-components";

export const StyleCell = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) =>
    props.index % 2 === 1 ? "#A7D947" : "#8ECC39"};

  div {
    align-self: center;
    font-size: ${(props) =>
      props.level === "9" ? `2rem` : props.level === "15" ? "1.5rem" : "1rem"};
  }
`;

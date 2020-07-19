import styled from "styled-components";

export const StyleCell = styled.div`
  display: flex;
  justify-content: center;

  -webkit-touch-callout: none;
  -webkit-user-select: none; /* Disable selection/copy in UIWebView */
  outline: none;
  border: 1px solid rgb(77, 133, 77);
  background-color: ${(props) =>
    props.isClicked && props.index % 2 === 0
      ? "#E5C29F"
      : props.isClicked && props.index % 2 !== 0
      ? "#D7B898"
      : props.index % 2 === 0
      ? "#A7D947"
      : "#8ECC39"};
  color: ${(props) =>
    props.neighbourBombs === 1
      ? "blue"
      : props.neighbourBombs === 2
      ? "green"
      : props.neighbourBombs === 3
      ? "red"
      : props.neighbourBombs === 4
      ? "purple"
      : props.neighbourBombs === 5
      ? "orange"
      : props.neighbourBombs === 6
      ? "black"
      : "yellow"};
  cursor: pointer;
  div {
    font-family: Arial, Helvetica, sans-serif;
    align-self: center;
    font-size: ${(props) =>
      props.level === "15" ? `.7rem` : props.level === "9" ? "1rem" : "1.2rem"};
  }
`;

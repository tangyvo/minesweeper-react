import styled from "styled-components";

export const StyleMenu = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: space-evenly;
  background-color: green;
  height: 60px;

  select {
    height: 35px;
    width: 80px;
    border-radius: 5px;
    align-self: center;
  }

  p {
    font-size: 1rem;
    color: white;
  }
  
  .best-time {
    text-align: center;
    align-self: center;

    span {
      font-size: .75rem;
    }
  }
`;

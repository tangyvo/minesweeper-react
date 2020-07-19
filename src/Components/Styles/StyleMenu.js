import styled from "styled-components";

export const StyleMenu = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: space-between;
  background-color: green;
  height: 60px;
  padding: 0 50px;

  select {
    height: 35px;
    width: 80px;
    border-radius: 5px;
    align-self: center;
  }

  p {
    font-size: 1rem;
    color: white;
    font-weight: 600;
  }

  .best-time {
    margin: auto;
    text-align: center;
    align-self: center;

    span {
      font-size: .75rem;
    }
  }
`;

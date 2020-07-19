import styled from "styled-components";

export const StyleBody = styled.div`
  width: 600px;

  h1 {
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    letter-spacing: 0.2em;
    font-size: 2rem;
    color: white;
    font-weight: 900;
    text-shadow: 2px 2px gray;
  }

  @media (max-width: 700px) {
    width: calc(100vw - 10px);
  }
`;

import styled from "styled-components";

export const StyleBody = styled.div`
  width: 500px;

  h1 {
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    letter-spacing: 0.2em;
    font-size: 2.5rem;
    color: #8ecc39;
    font-weight: 900;
    text-shadow: 2px 2px lightgray;
  }

  @media (max-width: 700px) {
    width: 400px;
  }
`;

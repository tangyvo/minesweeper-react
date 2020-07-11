import styled from "styled-components";

export const StyleGameOver = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    background-color: rgba(0,0,0,.6);
    color: white;
    font-size: 2.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px 25px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    z-index: 1;

    button {
        margin: 1em 0;
        align-self: center;
        width: 100px;
        padding: .5em 1em;
        cursor: pointer;
    }

`;

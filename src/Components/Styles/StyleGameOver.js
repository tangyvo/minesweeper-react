import styled from "styled-components";

export const StyleGameOver = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    background-color: rgba(0,0,0,.5);
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
    transition: 1s 1s ease;
    
    h2 {
        text-align: center;
        font-size: 2rem;
        text-shadow: 2px 2px black;
    }

    button {
        margin: .5em 0;
        align-self: center;
        width: 150px;
        padding: 1em 1.5em;
        border-radius: 10px;
        outline: none;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        border: 2px solid black;
        box-shadow: 1px 1px 0 1px rgba(0,0,0,.5);
    }

    button:hover,
    button:focus {
        background-color: green;
        color: white;
    }

`;

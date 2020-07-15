import styled from "styled-components";

export const StyleGame = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.level}, 1fr);
    grid-template-rows: repeat(${props => props.level}, 1fr);
    height: 500px;
    align-self: center;

    @media (max-width: 700px) {
        height: 400px;
    }
`;

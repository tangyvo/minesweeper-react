import styled from "styled-components";

export const StyleCell = styled.div`
         display: flex;
         justify-content: center;
         background-color: ${(props) =>
           props.isClicked && props.index % 2 === 0
             ? "#E5C29F"
             : props.isClicked && props.index % 2 !== 0
             ? "#D7B898"
             : props.index % 2 === 0
             ? "#A7D947"
             : "#8ECC39"};
         cursor: pointer;
         div {
           align-self: center;
           font-size: ${(props) =>
             props.level === "21"
               ? `.8rem`
               : props.level === "15"
               ? "1.5rem"
               : "2rem"};
         }
       `;

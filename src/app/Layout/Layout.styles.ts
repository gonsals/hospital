import styled from "styled-components";

export const Test = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    background-color: #242424;
    color: white;
    padding: 20px;

    nav {
        margin: 0 auto;
        min-width: 400px;
        max-width: 600px;
        width: 100%;
        top: 0;
        position: relative;
    }

    ul {
        list-style: none;
        display: flex;
        justify-content: space-between;
        padding: 0;
    }
`;

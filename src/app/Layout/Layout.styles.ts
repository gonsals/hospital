import styled from "styled-components";

export const Test = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    nav {
        margin: 0 auto;
        min-width: 300px;
        max-width: 600px;
        width: 100%;
    }

    ul {
        list-style: none;
        display: flex;
        justify-content: space-between;
        padding: 0;
    }
`;

import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 10px;
`;



export const SpanPatient = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom:12px;
    color: black;

background: rgba(146, 149, 200, 0.07);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(1.9px);
-webkit-backdrop-filter: blur(1.9px);

    strong {
        color: #646CFF;
    }
`;
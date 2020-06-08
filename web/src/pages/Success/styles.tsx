import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    background: #0e0a14;

    a {
        text-decoration: none;
        color: #f0f0f5;
        position: absolute;
        top: 50px;
        right: 80px;

        display: flex;
        justify-content: flex-end;
        align-items: center;

        svg {
            margin-right: 10px;
            color: #34cb79;
        }
    }

    div {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        svg {
            color: #34cb79;
        }

        h1 {
            font-size: 36px;
            color: #f0f0f5;
            margin-top: 10px;
        }
    }
`;

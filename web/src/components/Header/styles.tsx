import styled from 'styled-components';

export const HeaderEcoleta = styled.header`
    margin: 48px 0 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
        color: var(--title-color);
        font-weight: bold;
        text-decoration: none;

        display: flex;
        align-items: center;

        svg {
            margin-right: 16px;
            color: var(--primary-color);
        }
    }

    @media (max-width: 900px) {
        margin: 48px auto 0;
    }
`;

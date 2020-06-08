import styled from 'styled-components';
import { Map } from 'react-leaflet';

interface ItemProps {
    selected: boolean;
}

export const PageCreatePoint = styled.div`
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
`;

export const Form = styled.form`
    margin: 80px auto;
    padding: 64px;
    max-width: 730px;
    background: #fff;
    border-radius: 8px;

    display: flex;
    flex-direction: column;

    h1 {
        font-size: 36px;
    }

    /* fieldset {
        div.leaflet-container {
            width: 100%;
            height: 350px;
            border-radius: 8px;
            margin-bottom: 24px;
        }
    } */

    button {
        width: 260px;
        height: 56px;
        background: var(--primary-color);
        border-radius: 8px;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        border: 0;
        align-self: flex-end;
        margin-top: 40px;
        transition: background-color 0.2s;
        cursor: pointer;

        &:hover {
            background: #2fb86e;
        }
    }
`;

export const FieldsetContainer = styled.fieldset`
    margin-top: 64px;
    min-inline-size: auto;
    border: 0;

    legend {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;

        h2 {
            font-size: 24px;
        }

        span {
            font-size: 14px;
            font-weight: normal;
            color: var(--text-color);
        }
    }
`;

export const FieldGroup = styled.div`
    flex: 1;
    display: flex;
`;

export const Field = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    &:disabled {
        cursor: not-allowed;
    }

    & + & {
        margin-left: 24px;
    }

    label {
        font-size: 14px;
        margin-bottom: 8px;
    }

    input {
        flex: 1;
        background: #f0f0f5;
        border-radius: 8px;
        border: 0;
        padding: 16px 24px;
        font-size: 16px;
        color: #6c6c80;

        &::placeholder {
            color: #a0a0b2;
        }

        & + & {
            margin-left: 24px;
        }
    }

    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        flex: 1;
        background: #f0f0f5;
        border-radius: 8px;
        border: 0;
        padding: 16px 24px;
        font-size: 16px;
        color: #6c6c80;
        cursor: pointer;
    }
`;

export const MapElement = styled(Map)`
    width: 100%;
    height: 350px;
    border-radius: 8px;
    margin-bottom: 24px;
`;

export const ItemsGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    list-style: none;
`;

export const Item = styled.li<ItemProps>`
    background: ${props => (props.selected ? '#E1FAEC' : '#f5f5f5')};
    border: ${props =>
        props.selected ? '2px solid #34CB79' : '2px solid #f5f5f5'};
    height: 180px;
    border-radius: 8px;
    padding: 32px 24px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    text-align: center;

    cursor: pointer;

    span {
        flex: 1;
        margin-top: 12px;

        display: flex;
        align-items: center;
        color: var(--title-color);
    }
`;

import styled from 'styled-components';

const main = {
    colors: {
        lightGray: '#e3e3e3',
        darkGray: '#575757',
        primary: '#575ff3',
        lightPrimary: 'rgb(88, 95, 243, .75)',
        darkPrimary: 'rgb(81, 87, 245)',
        overlay: 'rgba(0, 0, 0, 0.65)',
        white: '#ffffff',
        error: 'indianred',
        success: 'lightgreen'
    }
};

interface ButtonProps {
    inverted?: boolean;
}

export const Button = styled.button<ButtonProps>`
    background-color: ${({ inverted }) => inverted ? main.colors.white : main.colors.darkPrimary};
    border: ${({ inverted }) => inverted ? `1px solid ${main.colors.lightPrimary}` : 'none'};
    color: ${({ inverted }) => inverted ? main.colors.lightPrimary : main.colors.white};
    cursor: pointer;
    border-radius: 24px;
    padding: 8px;
    width: 100px;
    height: 40px;
    transition: background .15s linear;

    &:first-child {
        margin-right: .5rem;
    }

    &:active, &:hover {
        background-color: ${({ inverted }) => inverted ? main.colors.lightPrimary : main.colors.lightPrimary};
        border: ${({ inverted }) => inverted ? 'none' : `1px solid ${main.colors.lightPrimary}`};
        color: ${main.colors.white};
    }
`;

export default main;

import styled from 'styled-components';
import theme from '../../../patterns/Themes';

const dragZoneBackground = (isDragging?: boolean): string => isDragging ? 'background-color: rgb(88, 95, 243, .25);' : '';

export const DragAndDropContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

export const HeaderText = styled.h3``;

export const DragZone = styled.div<{isDragging?: boolean}>`
    align-items: center;
    ${({ isDragging }) => dragZoneBackground(isDragging)}
    border: 2px ${({ isDragging }) => isDragging ? 'dashed' : 'solid'} ${theme.colors.primary};
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    width: 75%;
    height: 350px;
    margin: auto;
    transition: all .1s linear;
`

export const DragZoneText = styled.span`
    text-align: center;
    z-index: -1;
`;

export const Form = styled.form`
    display: none;
`;

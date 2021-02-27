import styled from 'styled-components';
import theme from '../../../patterns/Themes';

export const CopyPasteContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

export const HeaderText = styled.h3`
    width: 100%;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 40rem;
`;

export const CopyPasteTextArea = styled.textarea`
    align-self: center;
    border-radius: 4px;
    border: 2px solid ${theme.colors.lightPrimary};
    margin-bottom: 1rem;
    height: 300px;
    resize: none;
    width: inherit;
`;

export const StatusText = styled.span`
    font-size: 1rem;
    margin: .5rem auto;
`;

export const SubmitButton = styled.button<{ isDisabled: boolean }>`
    background-color: ${({ isDisabled }) => isDisabled ? theme.colors.lightPrimary : theme.colors.darkPrimary};
    color: white;
    cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};
    border-radius: 24px;
    padding: 8px;
    width: 150px;
    height: 40px;
    border: none;
    align-self: flex-end;

    &:active {
        background-color: ${theme.colors.primary};
    }
`;

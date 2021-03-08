import styled from 'styled-components';
import theme, { Button } from '../../patterns/Themes';

interface ModalProps {
    show: boolean;
}

export const ModalContainer = styled.div`
    position: absolute;
    width: 80%;
    height: 80%;
    background-color ${theme.colors.overlay};
`;

export const Modal = styled.div<ModalProps>`
    background-color: ${theme.colors.white};
    display: ${({ show }) => show ? 'flex' : 'none'};
    border-radius: 4px;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 15%;
    left: 30%;
    transition: top .25s linear;
    border: 1px solid ${theme.colors.lightGray};
    width: 28rem;
    height: 20rem;
    padding: 32px;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .5rem;
    width: 100%;
`;

export const Title = styled.h4`
    margin: 0;
`;

export const CurrentDataContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    height: 2.5rem;
    margin-top: 1rem;
`;

export const CurrentDataHeader = styled.h4`
    margin-right: .5rem;
`;
export const CurrentDataContent = styled.span`
    font-style: italic;
`;

export const NewDataContainer = styled(CurrentDataContainer)`
    width: 100%;
    margin-top: .25rem;
    margin-bottom: 1rem;
`;
export const NewDataHeader = styled(CurrentDataHeader)``;
export const NewDataInput = styled.input`
    border: 1px solid ${theme.colors.lightGray};
    border-radius: 6px;
    padding: 6px;
    width: 75%;
`;

export const CtaContainer = styled(CurrentDataContainer)`
    align-self: flex-end;
`;

export const CloseButton = styled(Button)`
    height: 1.75rem;
    padding: 0;
    justify-self: flex-end;
    width: 1.75rem;
`;

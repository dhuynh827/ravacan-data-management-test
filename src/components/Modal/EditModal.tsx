import React, { createRef, useRef, KeyboardEvent, RefObject, useEffect } from 'react';
import { Button } from '../../patterns/Themes';
import { TableHeaders } from '../../types/tableData';
import {
    CurrentDataContainer,
    CurrentDataContent,
    CurrentDataHeader,
    Modal,
    ModalContainer,
    NewDataContainer,
    NewDataHeader,
    NewDataInput,
    Title,
    CtaContainer,
    ModalHeader,
    CloseButton
} from './styles';

interface EditModalProps {
    editData: {
        key: TableHeaders | null;
        value: string | number;
    };
    handleModalClose(): void;
    handleValueUpdate(value: any): void;
    show: boolean;
}

const EditModal = ({ editData, handleModalClose, handleValueUpdate, show }: EditModalProps) => {
    const { key, value } = editData;

    const inputRef: RefObject<HTMLInputElement> = createRef();
    const modalRef: RefObject<HTMLDivElement> = useRef(null);

    const handleDiscardClick = () => {
        if (inputRef.current)
        inputRef.current.value = '';
    }

    useEffect(() => {
        if (show && modalRef.current) {
            modalRef.current.focus();
        }
    }, [ show, modalRef ]);

    const handleSubmit = () => {
        const { value } = inputRef.current as HTMLInputElement;
        const { value: origValue } = editData;

        if (!value || value !== origValue) {
            handleValueUpdate(value);
        }
    };

    const handleInputEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;

        if (key === 'Enter') {
            handleSubmit();
        }
    }

    const handleEscKey = (event: KeyboardEvent<HTMLDivElement>) => {
        const { key } = event;

        if (key === 'Escape') {
            handleModalClose();
        }
    }

    return (
        <ModalContainer tabIndex={0} onKeyUp={handleEscKey} ref={modalRef}>
            <Modal show={show}>
                <ModalHeader>
                    <Title>Editing {key && key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase()) }</Title>
                    <CloseButton inverted={true} onClick={handleModalClose}>X</CloseButton>
                </ModalHeader>
                <CurrentDataContainer>
                    <CurrentDataHeader>Current value: </CurrentDataHeader>
                    <CurrentDataContent>{value}</CurrentDataContent>
                </CurrentDataContainer>
                <NewDataContainer>
                    <NewDataHeader> New Value: </NewDataHeader>
                    <NewDataInput type='text' ref={inputRef} onKeyUp={handleInputEnterKey} defaultValue={value}/>
                </NewDataContainer>
                <CtaContainer>
                    <Button inverted={true} onClick={handleDiscardClick}>Discard</Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </CtaContainer>
            </Modal>
        </ModalContainer>
    );
}

export default EditModal;

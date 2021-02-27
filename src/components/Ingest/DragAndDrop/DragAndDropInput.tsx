import React, { createRef, DragEvent, RefObject, useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCsvFile } from '../../../actions/data';
import { State } from '../../../reducers';
import { DragAndDropContainer, DragZone, DragZoneText, Form, HeaderText } from './styles';

export const FILE_TYPE_ALLOWED = 'text/csv';

const DragAndDropInput = () => {
    const dispatch = useDispatch();
    const busy = useSelector(({ status: { busy } }: State) => busy);

    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const inputRef: RefObject<HTMLInputElement> = createRef();
    const formRef: RefObject<HTMLFormElement> = createRef();

    useEffect(
        () => {
            if (!busy) {
                setIsUploading(false);
            }
        }, [busy, setIsUploading]
    );

    const _validateFileType = (fileType: string) => fileType === FILE_TYPE_ALLOWED;

    const handleSubmit = useCallback((file: File) => {
        if (!_validateFileType(file.type)) {
            alert('invalid file type');
            return;
        }

        setIsUploading(true);
        setIsDragging(false);
        dispatch(uploadCsvFile(file));
    }, [ dispatch, setIsUploading, setIsDragging ]);

    const handleDragEnter = useCallback(
        () => {
            if (!isDragging) {
                setIsDragging(true);
            }
        }, [isDragging, setIsDragging]);

    const handleDragLeave = useCallback(
        () => {
            if (isDragging) {
                setIsDragging(false);
            }
        }, [ isDragging, setIsDragging ]);

    const handleOnDragOver = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
        }, []);

    const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();

        const { files } = event.dataTransfer;
        const file = files[0];

        handleSubmit(file);

    }, [ handleSubmit ]);

    const handleClick = useCallback(() => inputRef.current?.click(),[ inputRef ]);

    const handleInputChange = useCallback(() => {
        const { files } = inputRef.current || {};

        if (files) {
            handleSubmit(files[ 0 ]);
        }

    }, [ inputRef, handleSubmit ])

    return (
        <DragAndDropContainer>
            <HeaderText>Upload a csv file</HeaderText>
            <DragZone
                draggable={!isUploading}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleOnDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
                isDragging={isDragging}
            >
                {!isUploading && <DragZoneText>Click or Drag and Drop a csv file</DragZoneText>}
                {isUploading && <DragZoneText>Hang tight while we validate and process your csv file...</DragZoneText>}
            </DragZone>

            <Form ref={formRef}>
                <input type="file" ref={inputRef} onChange={handleInputChange} />
            </Form>

        </DragAndDropContainer>
    );
}

export default DragAndDropInput;

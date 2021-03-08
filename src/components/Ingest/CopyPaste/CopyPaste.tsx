import React, { createRef, RefObject, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processManualCsvUpload } from '../../../actions/data';
import { State } from '../../../reducers';
import { HeaderText } from '../DragAndDrop/styles';
import { CopyPasteContainer, CopyPasteTextArea, StatusText, SubmitButton, TextContainer } from './styles';

const CopyPaste = () => {
    const dispatch = useDispatch();
    const busy = useSelector(({ status: { busy } }: State) => busy);
    const [ isUploading, setIsUploading ] = useState(false);

    const inputRef: RefObject<HTMLTextAreaElement> = createRef();

    useEffect(
        () => {
            if (!busy) {
                setIsUploading(false);
            }
        }, [ busy, setIsUploading ]
    )

    const handleSubmit = useCallback(
        () => {
            const { value } = inputRef.current || {}
            if (!value) {
                return;
            }

            setIsUploading(true);
            dispatch(processManualCsvUpload(value));
        }, [ dispatch, inputRef, setIsUploading ])

    return (
        <CopyPasteContainer>
            <HeaderText>Copy and paste your csv here...</HeaderText>

            {isUploading && <StatusText>Hang tight while we validate and upload your csv data...</StatusText>}
            <TextContainer>
                <CopyPasteTextArea ref={inputRef} required={true} disabled={isUploading} placeholder={'Copy/paste or enter your csv here...'}/>
                <SubmitButton
                    disabled={isUploading}
                    isDisabled={isUploading}
                    onClick={handleSubmit}
                > Upload </SubmitButton>
            </TextContainer>
        </CopyPasteContainer>
    )
}

export default CopyPaste;

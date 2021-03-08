import React, { useRef } from 'react';
import { Button } from '../../../patterns/Themes';
import { UNIT_OF_MEASUREMENTS } from '../../../types/tableData';
import { DataAddressInput, DataInput, DataInputField, DataInputRow } from './styles';

interface DataEntryRowProps {
    fields: Array<string>;
    handleDataEntry(data: any): void;
}

const basicTypes = {
    'string': {
        pattern: '\\w+',
        placeholder: '001-abc',
        type: 'string',
    },
    'number': {
        pattern: '^\\d*\.?\\d*$',
        placeholder: '1.25',
        type: 'number',
        step: .05,
    },
    'date': {
        pattern: '^((\\d{4})-(\\d{2})-(\\d{2}))$',
        placeholder: 'yyyy-mm-dd',
        type: 'string',
    },
    'name': {
        pattern: '[\\w\\s]+',
        placeholder: 'First, Last',
        type: 'string'
    },
    'address': {
        pattern: /[^\,\#\.\-+|\w|\s|\d]/gi,
        placeholder: '111 supplier ave, san francisco ca 94105',
        type: 'string'
    }
}

interface FieldProperties {
    [key: string]: {
        placeholder: string;
        type: string;
        pattern: string | RegExp;
        step?: number;
    }
}

const fieldProperties: FieldProperties = {
    partNumber: basicTypes['string'],
    unitPrice: basicTypes['number'],
    quantity: basicTypes['number'],
    totalPrice: basicTypes['number'],
    uom: {
        pattern: '\\w+',
        placeholder: Object.values(UNIT_OF_MEASUREMENTS).toString(),
        type: 'input',
    },
    leadtime: basicTypes['date'],
    supplierName: basicTypes['name'],
    supplierAddress: basicTypes['address'],
    deliveryAddress: basicTypes[ 'address' ],
    purchasedDate: basicTypes['date']
}

const DataEntryRow = ({ fields, handleDataEntry }: DataEntryRowProps) => {
    const inputRefs: any = useRef([]);
    const textAreaRefs: any = useRef([]);

    const isAddressField = (key: string) => key.search(/address\b/gi) > -1;

    const validateEntry = () => {
        const newEntryObject: {[key: string]: any } = {};

        try {
            inputRefs.current.forEach((refs: HTMLInputElement) => {
                if (refs && !refs.checkValidity()) {
                    refs.reportValidity();
                    throw new Error('dirty bit');
                }

                if (refs && refs.name) {
                    newEntryObject[ refs.name ] = refs.value;
                }
            });

            textAreaRefs.current.forEach((refs: any) => {
                if (refs && (refs.value.length === 0 || refs.value.search(basicTypes.address.pattern) > -1)) {
                    refs.setCustomValidity('Address cannot be empty or contain special characters');
                    refs.reportValidity();
                    throw new Error('dirty bit');
                }

                if (refs && refs.name) {
                    newEntryObject[ refs.name ] = refs.value;
                }
            });

            handleDataEntry(newEntryObject);
        } catch(e) {
            console.log(e);
        }
    };

    return (
            <DataInputRow>
                {fields.map((key, index) => {
                    const { type, pattern, placeholder, step } = fieldProperties[key];

                    return (
                        <DataInputField key={index}>
                            {isAddressField(key) && <DataAddressInput
                                rows={5}
                                cols={3}
                                placeholder={placeholder}
                                ref={ref => textAreaRefs.current.push(ref)}
                                required={true}
                                name={key}
                            />}
                            {!isAddressField(key) && <DataInput
                                placeholder={placeholder}
                                type={type}
                                pattern={`${pattern}`}
                                step={step || ''}
                                required={true}
                                name={key}
                                ref={ref => inputRefs.current.push(ref)}
                            />}
                    </DataInputField>
                    );
                })}
                <DataInputField>
                    <Button onClick={validateEntry}>Add</Button>
                </DataInputField>
            </DataInputRow>
    )
}

export default DataEntryRow;

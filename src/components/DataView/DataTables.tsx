import React, { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doAddTableEntry, doUpdateData } from '../../actions/data';
import { State } from '../../reducers';
import { TableHeaders, TableData, PurchasedOrderData } from '../../types/tableData';
import EditModal from '../Modal/EditModal';
import DataEntryRow from './DataEntryRow/DataEntryRow';

import { Table, DataContainer, DataFields, HeaderField, TableHeader, Container, AddEntryButton } from './styles';

interface EditDataTypes {
    key: TableHeaders | null,
    value: string;
    index: number
}

const DataTables = () => {
    const [ editMode, setEditMode ] = useState(false);
    const [ addMode, setAddMode ] = useState(false);
    const [ editData, setEditData ] = useState({ key: null, value: '', index: 0 } as EditDataTypes);

    const dispatch = useDispatch();
    const PrevData = (oldData: PurchasedOrderData) => {
        const ref = useRef<PurchasedOrderData>();

        useEffect(() => {
            ref.current = oldData as any;
        }, [ ref, oldData ]);

        return ref.current;
    }
    const someData = useSelector(({ purchasedOrder }: State) => purchasedOrder) as PurchasedOrderData;
    const prevSomeData = PrevData(someData);
    const HEADER_FIELDS = useMemo(
        () => {
            if (!someData || !someData[0]) {
                return [];
            }

            return Object.keys(someData[0]);
        }, [ someData ]
    ) || [];

    useEffect(
        () => {
            if (editMode && someData !== prevSomeData) {
                const { key, index } = editData;
                setEditData({
                    key, index, value: !key ? '' : someData[index][key] as string
                });
            }
        }, [ someData, prevSomeData, editData, editMode, setEditData ]);

    const handleModalClose = useCallback(() => setEditMode(false), [ setEditMode ]);

    const handleClick = useCallback(
        (event: MouseEvent<HTMLTableCellElement>) => {
            const { textContent } = event.currentTarget;
            const key = event.currentTarget.getAttribute('data-key') as TableHeaders;
            const index = parseInt(event.currentTarget.getAttribute('data-index') as string);

            setEditMode(true);
            setEditData({
                key,
                value: textContent || '',
                index
            });
        },
        [ setEditMode, setEditData ]
    );

    const handleValueUpdate = useCallback(
        (value: any) => {
            const { key, index } = editData as EditDataTypes;
            dispatch(doUpdateData(key, value, index));
        }, [ dispatch, editData ]
    );

    const startDataEntry = () => {
        setAddMode(true);
    }

    const handleDataEntry = useCallback(
        (data: any) => {
            dispatch(doAddTableEntry(data));
    }, [ dispatch ]);

    return (
        <Container>
            <AddEntryButton onClick={startDataEntry}>Add Entry</AddEntryButton>
            <Table>
                <TableHeader>
                    <tr>
                        {HEADER_FIELDS.map((field, index) => (
                            <HeaderField key={`header-${index}`}>{field.replace(/([a-z]+)([A-Z])/g, (_match, group1, group2) =>
                                group1.replace(/^./, (char: string) => char.toUpperCase()) + ' ' + group2)}</HeaderField>
                        ))}
                    </tr>
                </TableHeader>
                <DataContainer>
                {someData.map((data: TableData, topIndex: number) => (
                    <tr key={`row-${topIndex}`}>
                        {Object.entries(data).map(([key, field]) => (
                            <DataFields
                                key={`${key}-${topIndex}`}
                                data-key={key}
                                data-index={topIndex}
                                title={key}
                                onClick={handleClick}
                            >{field}</DataFields>
                        ))}
                        <td></td>
                    </tr>
                ))}
                {addMode && <DataEntryRow fields={ HEADER_FIELDS } handleDataEntry={handleDataEntry}/>}
                </DataContainer>
            </Table>
            {editMode && <EditModal
                show={editMode}
                editData={editData}
                handleModalClose={handleModalClose}
                handleValueUpdate={handleValueUpdate}
            />}
        </Container>
    );
}

export default DataTables;

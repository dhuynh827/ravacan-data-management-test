import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doUpdateData } from '../../actions/data';
import { State } from '../../reducers';
import { TableHeaders, TableData, PurchasedOrderData } from '../../types/tableData';
import EditModal from '../Modal/EditModal';

import { Table, DataContainer, DataFields, HeaderField, TableHeader, Container } from './styles';

interface EditDataTypes {
    key: TableHeaders | null,
    value: string;
    index: number
}

const DataTables = () => {
    const [ editMode, setEditMode ] = useState(false);
    const [editData, setEditData ] = useState({ key: null, value: '', index: 0 } as EditDataTypes);

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

            return Object.keys(someData[0]).map((key: string) => key.replace(/([a-z]+)([A-Z])/g, (_match, group1, group2) =>
                group1.replace(/^./, (char: string) => char.toUpperCase()) + ' ' + group2)
            );
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

    return (
        <Container>
            <Table>
                <TableHeader>
                    <tr>
                        {HEADER_FIELDS.map((field, index) => (
                            <HeaderField key={`header-${index}`}>{field}</HeaderField>
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
                    </tr>
                ))}
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

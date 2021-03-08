import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doUpdateData } from '../../actions/data';
import { State } from '../../reducers';
import { TableHeaders, TableData, PurchasedOrderData } from '../../types/tableData';
import EditModal from '../Modal/EditModal';

import { Table, DataContainer, DataFields, HeaderField, TableHeader, Container } from './styles';

const HEADER_FIELDS: TableHeaders = [ 'Part Number', 'Price', 'Quantity', 'Total Price', 'UOM', 'Leadtime', 'Supplier Name',
    'Supplier Address', 'Delivery Address', 'Purchased Date' ];

const DataTables = () => {
    const [ editMode, setEditMode ] = useState(false);
    const [editData, setEditData ] = useState({ key: '', value: '', index: 0 });

    const dispatch = useDispatch();
    const PrevData = (oldData: Array<PurchasedOrderData>) => {
        const ref = useRef<Array<PurchasedOrderData>>();

        useEffect(() => {
            ref.current = oldData as any;
        }, [ ref, oldData ]);

        return ref.current;
    }
    const someData = useSelector(({ purchasedOrder }: State) => purchasedOrder);;

    const prevSomeData = PrevData(someData);

    useEffect(
        () => {
            if (editMode && someData !== prevSomeData) {
                const { key, index } = editData;
                setEditData({
                    key, index, value: someData[index][key]
                })
            }
        }, [ someData, prevSomeData, editData, editMode, setEditData ]);

    const handleModalClose = useCallback(() => setEditMode(false), [ setEditMode ]);

    const handleClick = useCallback(
        (event: MouseEvent<HTMLTableCellElement>) => {
            const { textContent } = event.currentTarget;
            const key = event.currentTarget.getAttribute('data-key') || '';
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
            const { key, index } = editData;
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

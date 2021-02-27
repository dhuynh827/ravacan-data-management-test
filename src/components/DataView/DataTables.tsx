import React, { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducers';
import { TableHeaders, TableData } from '../../types/tableData';

import { Container, DataContainer, DataFields, HeaderField, TableHeader } from './styles';

const HEADER_FIELDS: TableHeaders = [ 'Part Number', 'Price', 'Quantity', 'Total Price', 'UOM', 'Leadtime', 'Supplier Name',
    'Supplier Address', 'Delivery Address', 'Purchased Date' ];

const DataTables = () => {
    const someData = useSelector(({ purchasedOrder }: State) => purchasedOrder) || [];

    const handleMouseOver = (event: MouseEvent<HTMLTableCellElement>) => {
        console.log(event);
    }

    return (
        <Container>
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
                    {Object.values(data).map((field, index) => (
                        <DataFields key={`data-${topIndex}-${index}`} onMouseOver={handleMouseOver}>{field}</DataFields>
                    ))}
                </tr>
            ))}
            </DataContainer>
        </Container>
    );
}

export default DataTables;

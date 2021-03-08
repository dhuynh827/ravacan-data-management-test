import styled from 'styled-components';
import theme from '../../patterns/Themes';

export const Container = styled.div`
    display: flex;
`;

export const Table = styled.table`
    table-layout: fixed;
    border-spacing 1rem;
    width: 100%;
`;

export const TableHeader = styled.thead`
    text-align: center;
`;

export const HeaderField = styled.td`
    font-weight: 600;
`

export const DataContainer = styled.tbody`
    tr {
        margin: .5rem 0;;
    }
`;

export const DataFields = styled.td`
    font-size: .85rem;
    text-align: center;
    cursor: pointer;
    padding: 8px 4px;
    border-radius: 4px;

    &:hover {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
    }
`;

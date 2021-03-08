import styled from 'styled-components';
import theme, { Button } from '../../patterns/Themes';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
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
    border-spacing: .5rem;
`;

export const DataFields = styled.td`
    font-size: .85rem;
    text-align: center;
    cursor: pointer;
    padding: 8px 2px;
    border-radius: 4px;

    &:hover {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
    }
`;

export const AddEntryButton = styled(Button)``;

import styled from 'styled-components';
import theme from '../../patterns/Themes';
import {
    Link,
} from 'react-router-dom';

export const AppContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const AppHeader = styled.div`
    text-align: left;
    color: ${theme.colors.lightGray};
    margin: .75rem auto;
    width: 100%;
`;

export const ContentBody = styled.div`
    min-height: 80vh;
    width: 70%;
`;

export const NavContainer = styled.nav`
    background-color: ${ theme.colors.primary };
    border-right: 1px solid #e3e3e3;
    list-style: none;
    margin-right: 2rem;
    text-align: center;
    padding: 12px 0;
    width: 10%;

    li {
        padding: 8px 0;
    }
`;

export const NavLink = styled(Link)`
    color: ${ theme.colors.white };
    cursor: pointer;
    text-decoration: none;
`;

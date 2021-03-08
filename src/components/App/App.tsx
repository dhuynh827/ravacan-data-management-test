import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AppContainer, AppHeader, ContentBody, NavContainer, NavLink } from './styles';

import Home from '../Home/Home';

import logo from '../../static/logo.png';
import DragAndDropInput from '../Ingest/DragAndDrop/DragAndDropInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableData } from '../../actions/data';
import CopyPaste from '../Ingest/CopyPaste/CopyPaste';
import { State } from '../../reducers';

const App = () => {
    const dispatch = useDispatch();
    const purchasedOrder = useSelector(({ purchasedOrder }: State) => purchasedOrder);

    useEffect(() => {
        if (!purchasedOrder.length) {
            dispatch(fetchTableData());
        }
    }, [ dispatch, purchasedOrder ]);

    return (
        <AppContainer>
            <AppHeader>
                <a href="/"><img src={logo} width="150" alt="Ravacan"/></a>
            </AppHeader>
            <Router>
                <NavContainer>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/upload">Upload CSV</NavLink>
                    </li>
                    <li>
                        <NavLink to="/copy-paste">Copy/Paste CSV</NavLink>
                    </li>
                </NavContainer>

                <ContentBody>
                    <Switch>
                        <Route exact path="/Upload">
                            <DragAndDropInput/>
                        </Route>
                        <Route exact path="/copy-paste">
                            <CopyPaste />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </ContentBody>
            </Router>
        </AppContainer>
    );
};

export default App;

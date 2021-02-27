import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import 'normalize.css';
import './static/base-styles.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(...[thunk, logger])));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

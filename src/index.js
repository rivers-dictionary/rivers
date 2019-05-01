import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { StoreContext } from 'redux-react-hook';
import thunk from 'redux-thunk';
import reducer from './redux/reducer';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { restoreFromIndexedDB } from './redux/actions';
import * as db from './db';
import * as schema from './api/schema';
import './index.css';


const devtool = (process.env.NODE_ENV === 'development' && typeof window === 'object')
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;


const store = createStore(reducer, devtool(
  applyMiddleware(thunk.withExtraArgument({ db, schema }))
));

store.dispatch(restoreFromIndexedDB());

render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

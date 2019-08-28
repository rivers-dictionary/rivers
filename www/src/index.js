import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { StoreContext } from 'redux-react-hook';
import thunk from 'redux-thunk';
import reducer from './redux/reducer';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { restoreFromIndexedDB, restoreAuth } from './redux/actions';
import * as db from './db';
import * as schema from './api/schema';
import { Auth0Provider } from './components/Auth';
import { AUTH0 } from '@rivers/shared';
import './index.scss';

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
store.dispatch(restoreAuth());

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

render(
  <StoreContext.Provider value={store}>
    <Auth0Provider
      domain={AUTH0.domain}
      client_id={AUTH0.clientId}
      audience={AUTH0.audience}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

import React, { useState, useEffect, useContext, useCallback } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import { navigate } from '@reach/router';

const DEFAULT_REDIRECT_CALLBACK = () =>
  navigate('/');

export const Auth0Context = React.createContext();

export const useAuth0 = () => useContext(Auth0Context);

export function Auth0Provider({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) {
  const [ isAuthenticated, setIsAuthenticated ] = useState();
  const [ user, setUser ] = useState();
  const [ auth0Client, setAuth0 ] = useState();
  const [ loading, setLoading ] = useState(true);
  const [ popupOpen, setPopupOpen ] = useState(false);

  useEffect(() => {
    async function initAuth0() {
      const auth0Client = await createAuth0Client(initOptions);
      setAuth0(auth0Client);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0Client.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0Client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated){
        const user = await auth0Client.getUser();
        setUser(user);
      }

      setLoading(false);
    }

    initAuth0();
  }, []);

  const loginWithPopup = useCallback(async (params = {}) => {
    setPopupOpen(true);

    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }

    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  }, [auth0Client]);

  const handleRedirectCallback = useCallback(async () => {
    setLoading(true);

    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();

    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  }, [auth0Client]);

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
    { children }
    </Auth0Context.Provider>
  )
}

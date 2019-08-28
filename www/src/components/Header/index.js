import React, { useCallback, useState } from 'react';
import { Avatar, Toolbar, Button } from 'react-md';
import { useDispatch, useMappedState } from 'redux-react-hook';

import AddDictionaryDialog from '../Dialog/AddDictionary';
import { authorizeWithPopup } from '../../lib/auth0';
import { setAuth } from '../../redux/actions';
import './index.scss';

export default function Header() {
  const [ isAddDictoinaryDialogShow, eableAddDictoinaryDialogShow ] = useState(false);

  const handleToolbarActionAddClick = useCallback(
    () => eableAddDictoinaryDialogShow(true),
    [],
  );

  const handleVisibilityChange = useCallback(
    visible => eableAddDictoinaryDialogShow(visible),
    [],
  );

  return (
    <>
      <Toolbar
        className="rivers-toolbar"
        colored
        title={<h1 className="rivers-toolbar__title">Rivers Dictionary</h1>}
        nav={
          <Button icon>menu</Button>
        }
        actions={[
          <Button icon onClick={handleToolbarActionAddClick}>add</Button>,
          <AuthButton />
        ]}
      />
      <AddDictionaryDialog
        visible={isAddDictoinaryDialogShow}
        onVisibilityChange={handleVisibilityChange}
      />
    </>
  );
}

function AuthButton({ className }) {
  const user = useMappedState(
    useCallback(
      state => state.auth.user,
      [],
    )
  );

  const dispatch = useDispatch();

  const handleAuthBtnClick = useCallback(async () => {
    try {
      const authResult = await authorizeWithPopup({
        responseType: 'token id_token',
        redirectUri: 'http://localhost:3000/callback',
      });

      dispatch(setAuth({
        accessToken: authResult.accessToken,
        expiresIn: authResult.expiresIn,
        idToken: authResult.idToken,
        user: authResult.idTokenPayload,
      }));

    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!user) {
    return (
      <Button icon className={className}
        onClick={handleAuthBtnClick}
      >
        person
      </Button>
    );
  }

  return (
    <Avatar
      className={className}
      src={user.picture}
      role="presentation"
    />
  )
}

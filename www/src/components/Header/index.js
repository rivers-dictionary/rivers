import React, { useCallback, useState } from 'react';
import { Avatar, Toolbar, Button, CircularProgress } from 'react-md';

import AddDictionaryDialog from '../Dialog/AddDictionary';
import { useAuth0 } from '../Auth';
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
  const { loading, user, isAuthenticated, loginWithRedirect, logout } = useAuth0();


  if (!isAuthenticated) {
    return (
      <Button icon
        className={className}
        onClick={() => loginWithRedirect()}
      >
        person
      </Button>
    )
  }

  if (loading || !user) {
    return (
      <CircularProgress
        id="auth-btn-circular-progress"
        className={className}
      />
    )
  }

  return (
    <Avatar
      className={className}
      src={user.picture}
      onClick={() => logout()}
      role="presentation"
    />
  )
}

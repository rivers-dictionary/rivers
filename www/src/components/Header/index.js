import React, { useCallback, useState } from 'react';
import { navigate } from '@reach/router';
import { Toolbar, Button } from 'react-md';

import AddDictionaryDialog from '../Dialog/AddDictionary';
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
          <Button icon onClick={() => navigate('/dictionaries')}>person</Button>
        ]}
      />
      <AddDictionaryDialog
        visible={isAddDictoinaryDialogShow}
        onVisibilityChange={handleVisibilityChange}
      />
    </>
  );
}

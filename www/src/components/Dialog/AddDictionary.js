import React, { useState, useCallback } from 'react';
import { navigate } from '@reach/router';
import { useDispatch } from 'redux-react-hook';
import { DialogContainer, Button, TextField } from 'react-md';

import { addDictionary as reduxAddDictionary } from '../../redux/actions';

export default function AddDictionaryDialog({
  visible,
  onVisibilityChange,
}) {
  const [ name, setName ] = useState('');

  const dispatch = useDispatch();

  const handleAddActionClick = useCallback(
    () => {
      dispatch(reduxAddDictionary({ name }));
      navigate(`/dictionaries/${name}`);
      onVisibilityChange(false);
    },
    [name],
  )

  const handleHide = useCallback(
    () => {
      onVisibilityChange(false);
    }
  );

  return (
    <DialogContainer
      id="dialog-add-dictionary"
      title="Dictionary"
      contentClassName="md-grid"
      initialFocus="#dialog-add-dictionary__name"
      actions={[
        <Button primary flat
          onClick={handleAddActionClick}
        >
          Add
        </Button>
      ]}
      visible={visible}
      onHide={handleHide}
    >
      <TextField
        id="dialog-add-dictionary__name"
        className="md-cell md-cell--12"
        label="Name"
        value={name}
        onChange={setName}
      />
    </DialogContainer>
  )
}

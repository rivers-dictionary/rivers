import React, { useCallback, useState } from 'react';
import { Toolbar, Autocomplete, Button } from 'react-md';
import { navigate } from '@reach/router';
import useSuggestion from '../../hooks/useSuggestion';

export default function Search() {
  const [ word, setWord ] = useState('');

  const [ suggestions ] = useSuggestion(word);

  const handleChange = useCallback(
    word => setWord(word),
    [],
  );

  const handleAutoComplete = useCallback(
    word => {
      setWord(word);
      word && navigate(`/words/${word}`);
    },
    [],
  );

  const handleActionSearch = useCallback(
    () => word && navigate(`/words/${word}`),
    [word],
  );

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Enter') {
        word && navigate(`/words/${word}`);
      }
    },
    [word],
  )

  const handleActionClose = useCallback(
    () => setWord(''),
    [],
  );

  return (
    <Toolbar inset
      className="md-paper--2"
      title={
        <Autocomplete toolbar block autoFocus
          id="search-bar"
          filter={null}
          value={word}
          data={suggestions}
          onChange={handleChange}
          onAutocomplete={handleAutoComplete}
          onKeyDown={handleKeyDown}
        />
      }
      nav={
        <Button icon onClick={handleActionSearch}>search</Button>
      }
      actions={
        <Button icon onClick={handleActionClose}>close</Button>
      }
    />
  );
}

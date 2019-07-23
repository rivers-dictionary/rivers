import { useState, useEffect } from 'react';
import { fetchAutoCompleteJson } from '../api/cambridge';

export default function useSuggestion(word) {
  const [ suggestions, setSuggestion ] = useState([]);

  useEffect(
    () => {
      if (!word) return;

      fetchAutoCompleteJson(word)
        .then(({ results: suggestions }) => {
          setSuggestion(suggestions.map(s => s.searchtext));
        });
    },
    [word],
  )

  return [
    suggestions,
  ];
}

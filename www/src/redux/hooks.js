import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash';
import { getWord, increaseWordSearchCount } from './actions';

export function useWord(wordId) {
  const dispatch = useDispatch();

  const word = useSelector(state => state.words[wordId]);

  useEffect(
    () => { increaseWordSearchCount(wordId) },
    [wordId],
  );

  if (!word) {
    dispatch(getWord(wordId));
  }

  return {
    word,
  }
}

export function useDefination(definationId) {
  const defination = useSelector(state => state.definations[definationId]);

  return {
    defination,
  }
}

export function useDictionaries() {
  const dictionaries = useSelector(state => state.dictionaries);

  return {
    dictionaries: map(dictionaries),
  };
}

export function useDictionary(dictionaryId) {
  const dictionary = useSelector(state => state.dictionaries[dictionaryId]);

  return {
    dictionary,
  };
}

import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, List, ListItem, Subheader } from 'react-md';
import { Router, navigate } from '@reach/router';
import { map } from 'lodash';
import  Dictionary from './dictionary';
import { delDictionary as reduxDelDictionary } from '../../redux/actions';

export default function Dictionaries() {
  return (
    <>
      <Router>
        <DictionaryIndex path="/" />
        <Dictionary path=":dictionaryId" />
      </Router>
    </>
  );
}

function DictionaryIndex() {
  const dispatch = useDispatch();

  const dictionaries = useSelector(state => map(state.dictionaries));

  const handleItemClick = useCallback(
    name => navigate(`/dictionaries/${name}`),
    [],
  );

  const handleDeleteClick = useCallback(
    id => dispatch(reduxDelDictionary(id)),
    [],
  );

  return (
    <section className="md-grid">
      <List
        className="md-cell--center md-cell--6 md-paper md-paper--2"
      >
        <Subheader primaryText="Dictionaries" />
      { dictionaries.map(dictionary => (
        <ListItem renderChildrenOutside
          key={dictionary.id}
          primaryText={dictionary.name}
          leftAvatar={<Avatar>{dictionary.name[0]}</Avatar>}
          onClick={() => handleItemClick(dictionary.name)}
        >
          <Button icon
            onClick={() => handleDeleteClick(dictionary.id)}
          >
            delete
          </Button>
        </ListItem>
      ))}
      </List>
    </section>
  );
}

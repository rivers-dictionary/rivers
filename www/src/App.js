import React from 'react';
import { Router } from '@reach/router';
import WebFontLoader from 'webfontloader';
import Words from './pages/words';
import Word from './pages/words/word';
import Dictionaries from './pages/dictionaries';
import Header from './components/Header';
import Search from './components/Search';
import './App.scss';

WebFontLoader.load({
  google: {
    families: ['RobotoR:300,400,500,700', 'Material Icons'],
  },
});

export default function App() {
  return (
    <Router>
      <Index path="/">
        <Words path="words">
          <Word path=":wordId"/>
        </Words>
        <Dictionaries path="dictionaries/*" />
      </Index>
    </Router>
  );
};

function Index({ children }) {
  return (
    <>
      <Header />
      <div className="md-text-container">
        <Search />
      </div>
      { children }
    </>
  );
}

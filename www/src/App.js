import React from 'react';
import { Router } from '@reach/router';
import WebFontLoader from 'webfontloader';
import Words from './pages/words';
import Word from './pages/words/word';
import Dictionaries from './pages/dictionaries';
import Header from './components/Header';
import Search from './components/Search';
import { useAuth0 } from './components/Auth';
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

  const { getTokenSilently } = useAuth0();
  const onClick = async () => {
    const token = await getTokenSilently();

    const response = await fetch('/api/ping', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <>
      <Header />
      <div className="md-text-container">
        <Search />
      </div>
      <button onClick={onClick}>API</button>
      { children }
    </>
  );
}

import React from 'react';

import './index.scss';

export default function Words({ children }) {
  return (
    <section className="word-container">
      { children }
    </section>
  );
}

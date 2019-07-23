import React from 'react';
import { Toolbar, Button } from 'react-md';

import './index.scss';

export default function Header() {
  return (
      <Toolbar
        colored
        title={<span className="rivers-toolbar__title">Rivers Dictionary</span>}
        nav={
          <Button icon>menu</Button>
        }
      />
  )
}

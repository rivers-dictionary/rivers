import React, { useEffect } from 'react';
import auth0 from '../../lib/auth0';
import { CircularProgress } from 'react-md';
import './index.css';

export default function Callback() {
  useEffect(() => {
    auth0.popup.callback();
  }, []);

  return (
    <div id="callback-page" className="callback">
      <CircularProgress />
    </div>
  );
}

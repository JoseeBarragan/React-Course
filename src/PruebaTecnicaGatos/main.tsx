import  ReactDom  from 'react-dom/client';
import React from 'react';
import { App } from './app.tsx'
const root = ReactDom.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)

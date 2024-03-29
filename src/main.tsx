import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import 'todomvc-app-css/index.css'
import './styles/index.css'

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion  */
ReactDOM.createRoot(document.getElementById('root') as Element)
  .render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
  )
/* eslint-enable-next-line @typescript-eslint/no-non-null-assertion   */

import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import "./index.css"
import { BrowserRouter as Router } from 'react-router-dom'
import {AppProvider} from "./utils/context" 
ReactDom.render(
  <AppProvider>
  <Router>
    <App></App>
  </Router>
    </AppProvider>,
  document.getElementById('root')
)

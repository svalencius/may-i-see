import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = {}
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('mayISee__app')

let render = () => {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <AppContainer store={store} />
    </I18nextProvider>,
    MOUNT_NODE
  )
}

render()

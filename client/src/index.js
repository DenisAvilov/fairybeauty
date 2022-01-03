import React from 'react'
import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom'
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './toolkit/authSlice'
import './index.css'

const theme = unstable_createMuiStrictModeTheme()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
  ,
  document.getElementById('root')
)
// console.log('store:', store.getState())
reportWebVitals()

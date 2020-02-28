/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { createStore as reduxCreateStore } from 'redux'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'

import theme from '../theme'
import rootReducer from '../state'

const createStore = () => reduxCreateStore(rootReducer)

export default function TopLayout(props) {
  const { children } = props

  return (
    <>
      <Helmet>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        {/* <link
          href="https://fonts.googleapis.com/css?family=Poppins:300,500,700&display=swap"
          rel="stylesheet"
        /> */}
      </Helmet>
      <Provider store={createStore()}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Provider>
    </>
  )
}

TopLayout.propTypes = {
  children: PropTypes.node,
}

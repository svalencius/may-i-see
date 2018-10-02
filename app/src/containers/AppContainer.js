import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import CoreLayout from '../layouts/CoreLayout'

class AppContainer extends Component {
  render () {
    return (
      <CoreLayout>
        <div className='appContainer__wrapper' />
      </CoreLayout>
    )
  }
}

AppContainer.propTypes = {
}

export default withNamespaces(['translations'])(AppContainer)

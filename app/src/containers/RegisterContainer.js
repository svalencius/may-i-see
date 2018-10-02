import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import Routes from '../routes/Routes'
import enUS from 'antd/lib/locale-provider/en_US'
import { LocaleProvider } from 'antd'
import { translate } from 'react-i18next'
import RegisterLayout from '../layouts/RegisterLayout'

class AppContainer extends Component {
  shouldComponentUpdate = () => {
    return false
  }

  render () {
    const { store } = this.props

    return (
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory}>
              <Route path='/' component={RegisterLayout}>
                <IndexRoute component={Routes.gateway.component} />
                <Route path={Routes.register.path}
                  component={Routes.register.component} />
                <Route path={Routes.findYourCompany.path}
                  component={Routes.findYourCompany.component} />
              </Route>
              <Route path={Routes.registerWithEmail.path}
                component={Routes.registerWithEmail.component} />
            </Router>
          </div>
        </LocaleProvider>
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  store: PropTypes.object.isRequired
}

export default translate(['translations'], {
  wait: true
})(AppContainer)

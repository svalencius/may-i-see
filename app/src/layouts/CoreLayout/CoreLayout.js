import PropTypes from 'prop-types'
import React from 'react'
import './CoreLayout.scss'

export const CoreLayout = ({ children }) => (
  <div className='coreLayout__wrapper'>
    {children}
  </div>
)

CoreLayout.propTypes = {
  children : PropTypes.object
}

export default CoreLayout

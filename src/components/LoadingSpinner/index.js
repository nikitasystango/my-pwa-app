import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({ message, color }) => (
  <div className="full-page-loader text-center">
    <picture>
      <source srcSet={require('../../assets/images/loader.webp')} type="image/webp" />
      <img src={require('../../assets/images/loader.gif')} className="lazyload" alt="loading..." />
    </picture>
  </div>
)

Loader.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string
}

export default Loader


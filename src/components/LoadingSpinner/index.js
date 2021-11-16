import React from 'react'
// import { ClipLoader } from 'react-spinners'
import PropTypes from 'prop-types'
import './index.scss'

const Loader = ({ message, color }) => (
  <div className="full-page-loader-comp text-center">
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

// export const SmallLoader = () => (
//   <div className="text-center small_loader">
//     <ClipLoader
//       sizeUnit={'px'}
//       size={20}
//       color={'cyan'}
//       loading
//     />
//   </div>
// )

// export const CardLoader = () => (
//   <div className="text-center dashboard_card_loader">
//     <ClipLoader
//       sizeUnit={'px'}
//       size={20}
//       color={'cyan'}
//       loading
//     />
//   </div>
// )

export default Loader


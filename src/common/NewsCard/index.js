import React from 'react'
import PropTypes from 'prop-types'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import { Button } from 'semantic-ui-react'

import './index.scss'

const NewsCard = (props) => (
  <div className="news-card">
    <div className="news-card__inner">
      <div className="news-card__content">
        <p className="news-card__content-text">{props && props.text && props.text}</p>
        <span className="news-card__content-date">- {props && props.date && props.date}</span>
      </div>
      <div className="news-card__cta">
        <Button onClick={() => window.location.href = 'https://headwayapp.co/reward-flight-finder-updates'} className="btn btn--medium-blue">{intl(commonMessages.viewAll)}</Button>
      </div>
    </div>
  </div>
)

NewsCard.propTypes = {
  text: PropTypes.string,
  date: PropTypes.string
}

export default NewsCard

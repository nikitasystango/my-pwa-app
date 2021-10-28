import React from 'react'
import intl from 'utils/intlMessage'
import {
    AlertFrequency,
    WhereCanIGo,
    AvailabilityAlertMethod,
    MoreAirlines
} from 'utils/svgs'
import pagesMessages from 'constants/messages/pagesMessages'

const PricingFrequencyComponent = () => {
  const Pointer = ({ icon, title, content }) => (
    <div className="points-section__point">
      <div className="points-section__point-left">
        <span className="points-section__point-icon">{icon}</span>
      </div>
      <div className="points-section__point-right">
        <h4 className="points-section__point-title">{title}</h4>
        <div className="points-section__point-content">{content}</div>
      </div>
    </div>
  )

  return (
    <div className="points-section__inner">
      <Pointer
      icon={<AlertFrequency />}
      title={intl(pagesMessages.alertFrequency)}
      content={
        <>
          <p>{intl(pagesMessages.alertFrequencyGold)}</p>
          <p>{intl(pagesMessages.alertFrequencySilver)}</p>
          <p>{intl(pagesMessages.alertFrequencyBronze)}</p>
        </>
      }
      />
      <Pointer
      icon={<WhereCanIGo />}
      title={intl(pagesMessages.whereCanIGoMapSearch)}
      content={
        <p>{intl(pagesMessages.whereCanIGoMapSearchDesc)}</p>
      }
      />
      <Pointer
      icon={<AvailabilityAlertMethod />}
      title={intl(pagesMessages.availabilityMethod)}
      content={
        <>
          <p><b>{intl(pagesMessages.availabilityMethodEmail)}:</b> {intl(pagesMessages.availabilityMethodEmailDesc)}</p>
          <p><b>{intl(pagesMessages.availabilityMethodSms)}:</b> {intl(pagesMessages.availabilityMethodSmsDes)}</p>
        </>
      }
      />
      {/* <Pointer
      icon={<MobileApp />}
      title="iOS & Android App"
      content={
        <>
          <p>Easily see all of your alerts, and receive push notifications whenever we find new reward seat availability.</p>
        </>
      }
    /> */}
      <Pointer
      icon={<MoreAirlines />}
      title={intl(pagesMessages.moreAirlinesTitle)}
      content={
        <>
          <p>{intl(pagesMessages.moreAirlinesDes)}</p>
        </>
      }
      />
    </div>
  )
}

export default PricingFrequencyComponent

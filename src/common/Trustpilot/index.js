import React from 'react'
import { TrustPilot } from './style'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'

const TrustBox = () => {
  // Create a reference to the <div> element which will represent the TrustBox
  const ref = React.useRef(null)
  React.useEffect(() => {
  // If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
  // If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
  // When it is, it will automatically load the TrustBox.
  if (window.Trustpilot) {
    window.Trustpilot.loadFromElement(ref.current, true)
  }
  // eslint-disable-next-line
  }, [])
  return (
    <TrustPilot
      ref={ref} // We need a reference to this element to load the TrustBox in the effect.
      className="trustpilot-widget" // Renamed this to className.
      // [ long list of data attributes...]
      data-locale="en-GB" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="5a565ae13099bb0001ff9229" data-style-height="24px" data-style-width="100%" data-theme="light"
    >
      <a href="https://uk.trustpilot.com/review/rewardflightfinder.com" rel="noopener noreferrer" target="_blank"> {intl(commonMessages.trustPilot)}</a>
    </TrustPilot>
  )
}
export default TrustBox

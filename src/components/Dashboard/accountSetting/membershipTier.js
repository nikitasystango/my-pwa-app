import React from 'react'
import { Header } from 'semantic-ui-react'
import '../assets/change-password-modal.scss'

const MembershipTier = (props) => (
  <>
    <Header content="Airline Membership Tier" />
    <p className="cst-popup__text mt-1"> Please select your airline membership tier</p>
  </>
  )

MembershipTier.propTypes = {
}

export default MembershipTier

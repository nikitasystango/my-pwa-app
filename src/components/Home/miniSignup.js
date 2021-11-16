import React from 'react'
import { Grid, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { retrieveFromLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import staticMessage from 'constants/messages/homeMessages'
import commonMessages from 'constants/messages/commonMessages'
import intl from 'utils/intlMessage'
import './assets/scss/miniSignupCard.scss'

const MiniSignupCard = (props) => {
  const { isUserSilverMember, isUserGoldMember } = props
  const token = retrieveFromLocalStorage('token')
  const appendParams = sessionStorage.getItem('queryParamsGA')

  return (
    <div className="mini-signup-card">
      <Grid className="m-0">
        <Grid.Row className="m-0">
          <Grid.Column mobile={9} tablet={10} computer={10} widescreen={12} verticalAlign="middle" className="mini-signup-card__col-left">
            {!token &&
              <h5 className="mini-signup-card__text">{intl(staticMessage.miniSignUpLoggedOut)}</h5>
            }
            {(token && !isUserSilverMember && !isUserGoldMember) &&
              <h5 className="mini-signup-card__text">{intl(staticMessage.miniSignBronze)}</h5>
            }
            {isUserSilverMember &&
              <h5 className="mini-signup-card__text">{intl(staticMessage.miniSignUpSilver)}</h5>
            }
          </Grid.Column>
          <Grid.Column mobile={7} tablet={6} computer={6} widescreen={4} textAlign="right" className="mini-signup-card__col-right">
            <Button className="btn btn--medium-blue"
            onClick={() => navigateToRespectivePage(token ? AppRoutes.PRICING : AppRoutes.SIGN_UP, appendParams)}
            >{token ? intl(commonMessages.upgrade) : intl(commonMessages.signUpNow)}</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

MiniSignupCard.propTypes = {
  isUserSilverMember: PropTypes.bool,
  isUserGoldMember: PropTypes.bool
}

export default React.memo(MiniSignupCard)

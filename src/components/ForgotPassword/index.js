import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'containers/Layout'
import { Grid } from 'semantic-ui-react'
import ForgotPasswordForm from './forgotPasswordForm'
import ResetPasswordForm from './resetPasswordForm'
import SeoHelmet from 'utils/seoHelmet'
import SeoTexts from 'constants/seoConstants'
import { AppRoutes } from 'constants/appRoutes'
import './forgot-password.scss'

const ForgotPasswordComponent = (props) => {
  const pathType = props.match.path === AppRoutes.FORGET_PASSWORD ? 'forgot' : 'reset'

  const handleForgotPassword = (data) => {
    const { initiateForgotPassword } = props
    initiateForgotPassword(data)
  }

  const handleResetPassword = (data) => {
    const { resetPassword } = props
    resetPassword(data)
  }

  return (
    <React.Fragment>
      {pathType === 'forgot' ?
        <SeoHelmet
          title={SeoTexts.FORGOT_TITLE}
        />
        :
        <SeoHelmet
          title={SeoTexts.RESET_TITLE}
        />
      }
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column tablet={16} computer={5} />
            <Grid.Column tablet={16} computer={6} className="forgot-reset-password-form">
              {pathType === 'forgot' ?
                <ForgotPasswordForm {...props} handleForgotPassword={handleForgotPassword} />
                :
                <ResetPasswordForm {...props} handleResetPassword={handleResetPassword} />
              }
            </Grid.Column>
            <Grid.Column tablet={16} computer={5} />
          </Grid.Row>
        </Grid>
      </Layout>
    </React.Fragment>
  )
}

ForgotPasswordComponent.propTypes = {
  match: PropTypes.object,
  forgotPassword: PropTypes.object,
  initiateForgotPassword: PropTypes.func,
  resetPassword: PropTypes.func
}

export default ForgotPasswordComponent

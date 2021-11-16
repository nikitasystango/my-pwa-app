import LogoFull from '../assets/images/logo-img.png'
import { AppRoutes } from 'constants/appRoutes'
import howItWorks from '../assets/images/how-it-works-bg.jpg'
import virginAtlantic from '../components/Pages/assets/images/virgin-atlantics/va-flights-bg.png'
import aerLingus from '../components/Pages/assets/images/aer-lingus/al-banner-bg.png'
import americanAirlines from '../components/Pages/assets/images/americanairlines/americalairline-bg.png'
import vuelingAirlines from '../components/Pages/assets/images/vuelingairlines/vuelingairlines-bg.png'
import iberiaAirlines from '../components/Pages/assets/images/iberiaairlines/iberiaairlines-bg.png'
import airFranceAirlines from '../components/Pages/assets/images/airfranceairlines/airfranceairlines-bg.png'
import klmAirlines from '../components/Pages/assets/images/klmairlines/klm-bg.png'
import deltaAirlines from '../components/Pages/assets/images/deltaairlines/delta-bg.png'
import intl from 'utils/intlMessage'
import seoMessages from 'constants/messages/seoMessages'
const baseURL = window?.location?.origin || 'https://www.rewardflightfinder.com/'

const SeoTexts = {
  // Landing page
  HOME_TITLE: intl(seoMessages.seoHomeTitle),
  HOME_DESCRIPTION: intl(seoMessages.seoHomeDesc),
  HOME_CANONICAL: baseURL,
  HOME_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  HOME_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // Voucher page
  VOUCHER_TITLE: intl(seoMessages.seoVoucherTitle),
  VOUCHER_DESCRIPTION: intl(seoMessages.seoVoucherDesc),
  VOUCHER_CANONICAL: `${baseURL}${AppRoutes.CAMPANION_VOUCHER}/`,
  VOUCHER_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  VOUCHER_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // Cancel elite membership page
  CANCEL_ELITE_TITLE: intl(seoMessages.seoCancelEliteTitle),
  CANCEL_ELITE_DESCRIPTION: intl(seoMessages.seoCancelEliteDesc),
  CANCEL_ELITE_CANONICAL: `${baseURL}${AppRoutes.CANCEL_ELITE_MEMBER}/`,
  CANCEL_ELITE_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  CANCEL_ELITE_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // Privacy-policy
  PRIVACY_POLICY_TITLE: intl(seoMessages.seoPrivacyPolicyTitle),
  PRIVACY_POLICY_DESCRIPTION: intl(seoMessages.seoPrivacyPolicyDesc),
  PRIVACY_POLICY_CANONICAL: `${baseURL}${AppRoutes.PRIVACY_POLICY}/`,
  PRIVACY_POLICY_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  PRIVACY_POLICY_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // Disclamer
  DISCLAIMER_TITLE: intl(seoMessages.seoDisclaimerTitle),
  DISCLAIMER_DESCRIPTION: intl(seoMessages.seoDisclaimerDesc),
  DISCLAIMER_CANONICAL: `${baseURL}${AppRoutes.DISCLAIMER}/`,
  DISCLAIMER_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  DISCLAIMER_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // Help center
  HELP_TITLE: intl(seoMessages.seoHelpTitle),
  HELP_DESCRIPTION: intl(seoMessages.seoHelpDesc),
  HELP_CANONICAL: `${baseURL}${AppRoutes.HELP}/`,
  HELP_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  HELP_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // 404 page
  ERROR_PAGE_TITLE: intl(seoMessages.seoErrorPageTitle),
  ERROR_PAGE_DESCRIPTION: intl(seoMessages.seoErrorPageDesc),
  ERROR_PAGE_CANONICAL: `${baseURL}${AppRoutes.PAGE_NOT_FOUND}/`,
  ERROR_PAGE_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  ERROR_PAGE_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // Thankyou signup page
  THANKYOU_TITLE: intl(seoMessages.seoThankyouTitle),
  THANKYOU_DESCRIPTION: intl(seoMessages.seoThankyouDesc),
  THANKYOU_CANONICAL: `${baseURL}${AppRoutes.THANK_YOU}`,
  THANKYOU_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  THANKYOU_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // Thankyou for purchase membership
  PURCHASE_MEMBERSHIP_TITLE: intl(seoMessages.seoPurchaseTitle),
  PURCHASE_MEMBERSHIP_DESCRIPTION: intl(seoMessages.seoPurchaseDesc),
  PURCHASE_MEMBERSHIP_CANONICAL: `${baseURL}/memberships/purchase/`,
  PURCHASE_MEMBERSHIP_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  PURCHASE_MEMBERSHIP_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // blog
  BLOG_TITLE: intl(seoMessages.seoBlogTitle),
  BLOG_DESCRIPTION: intl(seoMessages.seoBlogDesc),
  BLOG_CANONICAL: `${baseURL}${AppRoutes.NEWS_AND_ADVICE}/`,
  BLOG_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  BLOG_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // sign in
  SIGN_IN_TITLE: intl(seoMessages.seoSignInTitle),
  SIGN_IN_DESCRIPTION: intl(seoMessages.seoSignInDesc),
  SIGN_IN_CANONICAL: `${baseURL}${AppRoutes.SIGN_IN}/`,
  SIGN_IN_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  SIGN_IN_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // sign up
  SIGN_UP_TITLE: intl(seoMessages.seoSignUpTitle),
  SIGN_UP_DESCRIPTION: intl(seoMessages.seoSignUpDesc),
  SIGN_UP_CANONICAL: `${baseURL}${AppRoutes.SIGN_UP}`,
  SIGN_UP_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  SIGN_UP_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // Faq page
  FAQ_TITLE: intl(seoMessages.seoFaqTitle),
  FAQ_DESCRIPTION: intl(seoMessages.seoFaqDesc),
  FAQ_CANONICAL: `${baseURL}${AppRoutes.FAQ}/`,
  FAQ_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  FAQ_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // Calendar page
  CALENDAR_TITLE: intl(seoMessages.seoCalendarTitle),
  CALENDAR_DESCRIPTION: intl(seoMessages.seoCalendarDesc),
  CALENDAR_CANONICAL: `${baseURL}${AppRoutes.CALENDER}/`,
  CALENDAR_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  CALENDAR_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // Forget pass
  FORGOT_TITLE: intl(seoMessages.seoForgotTitle),

  // Reset pass
  RESET_TITLE: intl(seoMessages.seoResetTitle),

  // pricing page
  PRICING_TITLE: intl(seoMessages.seoPricingTitle),
  PRICING_DESCRIPTION: intl(seoMessages.seoPricingDesc),
  PRICING_CANONICAL: `${baseURL}${AppRoutes.PRICING}/`,
  PRICING_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  PRICING_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,

  // how it works page
  HOW_IT_WORKS_TITLE: intl(seoMessages.seoHowItWorksTitle),
  HOW_IT_WORKS_DESCRIPTION: intl(seoMessages.seoHowItWorksDesc),
  HOW_IT_WORKS_CANONICAL: `${baseURL}${AppRoutes.HOW_IT_WORKS}/`,
  HOW_IT_WORKS_OG_IMAGE_URL: `${baseURL}${howItWorks}`,
  HOW_IT_WORKS_TWITTER_IMAGE_URL: `${baseURL}${howItWorks}`,

  // Terms of use page
  TERMS_OF_USE_TITLE: intl(seoMessages.seoTermOfUseTitle),
  TERMS_OF_USE_DESCRIPTION: intl(seoMessages.seoTermOfUseDesc),
  TERMS_OF_USE_CANONICAL: `${baseURL}${AppRoutes.TERMS_OF_USE}/`,
  TERMS_OF_USE_OG_IMAGE_URL: `${baseURL}${LogoFull}`,
  TERMS_OF_USE_TWITTER_IMAGE_URL: `${baseURL}${LogoFull}`,
  // Map page
  MAP_TITLE: intl(seoMessages.seoMapViewTitle),

  // Account setting page
  ACCOUNT_SETTING_TITLE: intl(seoMessages.seoAccountSettingTitle),

  // Verify User page
  VERIFY_USER_TITLE: intl(seoMessages.verifyUserTitle),

  // Alert page
  ALERT_TITLE: intl(seoMessages.seoAlertTitle),

  // Subscription page
  SUBSCRIPTION_TITLE: intl(seoMessages.seoSubscriptionTitle),

  // Cookie policy
  COOKIE_POLICY_TITLE: intl(seoMessages.seoCookiePolicyTitle),
  COOKIE_POLICY_CANONICAL: `${baseURL}${AppRoutes.COOKIE_POLICY}/`,

  // Tags
  TAGS_TITLE: intl(seoMessages.seoTagsTitle),

  // virgin atlantic page
  VIRGIN_TITLE: intl(seoMessages.seoVirginAtlanticTitle),
  VIRGIN_DESCRIPTION: intl(seoMessages.seoVirginAtlanticDesc),
  VIRGIN_CANONICAL: `${baseURL}${AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS}/`,
  VIRGIN_OG_IMAGE_URL: `${baseURL}${virginAtlantic}`,
  VIRGIN_TWITTER_IMAGE_URL: `${baseURL}${virginAtlantic}`,

  // Aer Lingus page
  AER_TITLE: intl(seoMessages.airlingusTitle),
  AER_LINGUS_DESCRIPTION: intl(seoMessages.airlingusDesc),
  AER_LINGUS_CANONICAL: `${baseURL}${AppRoutes.AER_LINGUS}/`,
  AER_LINGUS_OG_IMAGE_URL: `${baseURL}${aerLingus}`,
  AER_LINGUS_TWITTER_IMAGE_URL: `${baseURL}${aerLingus}`,

  // American Airlines
  AMERICAN_AIRLINE_TITLE: intl(seoMessages.americanAirlinesTitle),
  AMERICAN_AIRLINE_DESCRIPTION: intl(seoMessages.americanAirlinesDesc),
  AMERICAN_AIRLINE_CANONICAL: `${baseURL}${AppRoutes.AMERICAN_AIRLINE_REWARD_FLIGHTS}/`,
  AMERICAN_AIRLINE_OG_IMAGE_URL: `${baseURL}${americanAirlines}`,
  AMERICAN_AIRLINE_TWITTER_IMAGE_URL: `${baseURL}${americanAirlines}`,

    // Vueling airlines page
    VUELING_TITLE: intl(seoMessages.seoVuelingAirlinesTitle),
    VUELING_DESCRIPTION: intl(seoMessages.seoVuelingAirlinesDesc),
    VUELING_CANONICAL: `${baseURL}${AppRoutes.VUELING_AIRLINES}/`,
    VUELING_OG_IMAGE_URL: `${baseURL}${vuelingAirlines}`,
    VUELING_TWITTER_IMAGE_URL: `${baseURL}${vuelingAirlines}`,

    // Iberia airlines page
    IBERIA_TITLE: intl(seoMessages.seoIberiaAirlinesTitle),
    IBERIA_DESCRIPTION: intl(seoMessages.seoIberiaAirlinesDesc),
    IBERIA_CANONICAL: `${baseURL}${AppRoutes.IBERIA_AIRLINES}/`,
    IBERIA_OG_IMAGE_URL: `${baseURL}${iberiaAirlines}`,
    IBERIA_TWITTER_IMAGE_URL: `${baseURL}${iberiaAirlines}` ,
    // AIR FRANCE airlines page
    AIRFRANCE_TITLE: intl(seoMessages.seoAirFranceAirlinesTitle),
    AIRFRANCE_DESCRIPTION: intl(seoMessages.seoAirFranceAirlinesDesc),
    AIRFRANCE_CANONICAL: `${baseURL}${AppRoutes.AIRFRANCE_AIRLINES}/`,
    AIRFRANCE_OG_IMAGE_URL: `${baseURL}${airFranceAirlines}`,
    AIRFRANCE_TWITTER_IMAGE_URL: `${baseURL}${airFranceAirlines}`,
    // KLM airlines page
    KLM_TITLE: intl(seoMessages.seoKlmAirlinesTitle),
    KLM_DESCRIPTION: intl(seoMessages.seoKlmAirlinesDesc),
    KLM_CANONICAL: `${baseURL}${AppRoutes.KLM_AIRLINES}/`,
    KLM_OG_IMAGE_URL: `${baseURL}${klmAirlines}`,
    KLM_TWITTER_IMAGE_URL: `${baseURL}${klmAirlines}`,
    // DELTA airlines page
    DELTA_TITLE: intl(seoMessages.seoDeltaAirlinesTitle),
    DELTA_DESCRIPTION: intl(seoMessages.seoDeltaAirlinesDesc),
    DELTA_CANONICAL: `${baseURL}${AppRoutes.DELTA_AIRLINES}/`,
    DELTA_OG_IMAGE_URL: `${baseURL}${deltaAirlines}`,
    DELTA_TWITTER_IMAGE_URL: `${baseURL}${deltaAirlines}`
}

export default SeoTexts

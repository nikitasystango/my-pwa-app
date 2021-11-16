import React from 'react'
import LogoFull from '../assets/images/logo-img.png'
import { AppRoutes } from 'constants/appRoutes'

const baseURL = window?.location?.origin || 'https://www.rewardflightfinder.com/'

export const HomeRichSnippet = (
  <script type="application/ld+json">
    {
      `{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Reward Flight Finder",
        "url": "${baseURL}",
        "logo": "${baseURL}${LogoFull}",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+44 20 8103 5997",
          "contactType": "Email",
          "areaServed": "GB",
          "availableLanguage": "en"
        },
        "sameAs": [
          "https://www.instagram.com/rewardflightfinder/",
          "https://www.facebook.com/rewardflightfinder/",
          "https://twitter.com/rewardflightfdr",
          "https://www.linkedin.com/company/reward-flight-finder/"
        ]
      }`
    }
  </script>
)

export const voucherCampain = (
  <script type="application/ld+json">
    {`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Using your BA companion voucher: a beginner's guide - Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.CAMPANION_VOUCHER}", 
    "description": "Ultimate guide to know all about the British Airways companion voucher and how to redeem your BA 2 for 1 voucher: Save Money on Flights | Try Reward Flight Finder today."
    }`}
  </script>
)

export const memberShipSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Get Hourly Reward Flight Availability Alerts with RFF Elite Membership",
    "url": "${baseURL}${AppRoutes.PRICING}", 
    "description": "Earning BA Avios is easy - finding reward seats is not. We search every hour, and alert you when seats become available. Sign up for our Elite Membership and get hourly alerts when BA releases seats."
    }`}
  </script>
)

export const cancelMembershipSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Get Hourly Reward Flight Availability Alerts with RFF Elite Membership",
    "url": "${baseURL}${AppRoutes.CANCEL_ELITE_MEMBER}",
    "description": "Earning BA Avios is easy - finding reward seats is not. We search every hour, and alert you when seats become available. Sign up for our Elite Membership and get hourly alerts when BA releases seats."
    }`}
  </script>
)

export const howItWorksSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "How It Works | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.HOW_IT_WORKS}",
    "description": "RFF makes your BA reward flight search easy by sending you hourly reward flight seat availability alerts. Check out our complete guide to learn how easily Reward Flight Finder works!"
    }`}
  </script>
)

export const privacyPolicySnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.PRIVACY_POLICY}", 
    "description": "This page informs you of our policies regarding the collection, use and disclosure of personal information we receive from users of the site."
    }`}
  </script>
)

export const disclamerSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Disclaimer | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.DISCLAIMER}", 
    "description": "We aim to be completely transparent about what data we collect and how we use it. To know more, read here!"
    }`}
  </script>
)

export const helpCenterSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Help Center | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.HELP}", 
    "description": "Find answers of all your questions on one page."
    }`}
  </script>
)

export const errorPageSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "404 Error Page | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.PAGE_NOT_FOUND}", 
    "description": "404 Error Page"
    }`}
  </script>
)

export const thankyouSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Thank For Signing Up | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.THANK_YOU}", 
    "description": "Thanks for Signing Up to Reward Flight Finder. Get free reward flight alerts directly to your email or phone. Stay updated!"
    }`}
  </script>
)

export const purchaseThankyouSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Thanks for Membership Subscription | Reward Flight Finder",
    "url": "${baseURL}/memberships/purchase", 
    "description": "Thanks for subscribing to our membership. Now get hourly reward flight alerts straight to your email or phone. Putting you ahead!"
    }`}
  </script>
)

export const blogSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "News & Advice | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.NEWS_AND_ADVICE}",
    "description": "Our news & advice keeps you updated with the latest reward flight news. Keep reading!"
    }`}
  </script>
)

export const signInSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Sign In | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.SIGN_IN}", 
    "description": "Sign in and get started with your flight availability search."
    }`}
  </script>
)

export const signUpSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Sign Up | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.SIGN_UP}", 
    "description": "Sign up for Reward Flight Finder and get free alerts."
    }`}
  </script>
)

export const faqSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Frequently Asked Questions | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.FAQ}", 
    "description": "Get answers to the frequently asked questions on flight status, fares, refunds, cancellations, check-in etc."
    }`}
  </script>
)

export const calendarSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Calendar | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.CALENDER}", 
    "description": "Check availability of British Airways reward flight space of a whole year in just one click. Sign up to Elite Membership and check year-round reward flight space availability."
    }`}
  </script>
)

export const termsofUseSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Term of Use | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.TERMS_OF_USE}", 
    "description": "The Terms and Conditions laid down here provide information on how Reward Flight Finder Aviation works and help their customers."
    }`}
  </script>
)

export const virginAtlanticSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Find Virgin Atlantic Reward Seats for Free | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS}", 
    "description": "Reward Flight Finder lets you easily search for Virgin Atlantic reward flights and discover seats with just one click. Sign up now & receive alerts whenever seats become available."
    }`}
  </script>
)

export const aerLingusSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Find Aer Lingus Award Seats on Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.AER_LINGUS}", 
    "description": "Find Aer Lingus reward flights to book using Avios on RFF. Check availability in just one click and receive alerts whenever seats become available. Sign up now!"
    }`}
  </script>
)

export const americanAirlinesSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Find American Airlines Award Seats | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.AMERICAN_AIRLINE_REWARD_FLIGHTS}", 
    "description": "Discover American Airlines Award Seats with Reward Flight Finder. Check availability in just one click. Get alerts when seats become available. Sign up today!"
    }`}
  </script>
)

export const airFranceSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Find Air France Flying Blue Reward Seats | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.AIRFRANCE_AIRLINES}", 
    "description": "Check 12 Months of Air France Reward Flight Availability on One Page using Reward Flight Finder Tool. Receive alerts whenever seats become available. Sign up now!"
    }`}
  </script>
)

export const deltaAirlineSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Find Delta SkyMiles Reward Seats | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.DELTA_AIRLINES}", 
    "description": "Discover Delta SkyMiles Reward Seats on RFF & Save Money. Check availability in just one click and receive alerts whenever seats become available. Sign up now!"
    }`}
  </script>
)

export const iberiaAirlineSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Find Iberia Reward Flight Seats on Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.IBERIA_AIRLINES}", 
    "description": "Discover Iberia Reward Flight Seats with RFF. Find a year of Iberia reward flight availability on one page. Get alerts when seats become available. Sign up now!"
    }`}
  </script>
)

export const klmAirlineSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Discover KLM Reward Flight Seats on Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.KLM_AIRLINES}", 
    "description": "Finding KLM Reward Flights is now easy with RFF. Check an year of KLM reward flight availability and get alerts when seats become available. Sign up for free!"
    }`}
  </script>
)

export const vuelingAirlineSnippet = (
  <script type="application/ld+json">{`{
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Discover Vueling Reward Seats | Reward Flight Finder",
    "url": "${baseURL}${AppRoutes.VUELING_AIRLINES}", 
    "description": "Find Vueling Reward Seats and Save Money. Check availability in just one click and receive alerts whenever seats become available. Sign up now!"
    }`}
  </script>
)
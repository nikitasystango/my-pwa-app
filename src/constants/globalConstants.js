import React from 'react'
import { MyAlerts, Subscription, Profile, UserIcon, ProfileBell, LockPassword, ContactIcon, AirlineIcon } from '../utils/svgs'
import { sortObjectArray } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'

export const sidebarMenu = [
  // { name: 'Home', url: '/dashboard/home', d: 'M14.7147 9.36421C14.7147 9.02689 14.9944 8.7531 15.3392 8.7531C15.6841 8.7531 15.9639 9.02689 15.9639 9.36421V16.1365C15.9639 16.4739 15.6841 16.7476 15.3392 16.7476H10.6278C10.2829 16.7476 10.0032 16.4739 10.0032 16.1365V12.9211H8.43024V16.1365C8.43024 16.4739 8.15053 16.7476 7.80567 16.7476H3.09463C2.74977 16.7476 2.47007 16.4739 2.47007 16.1365V9.36421C2.47007 9.02689 2.74977 8.7531 3.09463 8.7531C3.43947 8.7531 3.71927 9.02689 3.71927 9.36421V15.5253H7.18103V12.3099C7.18103 11.9725 7.46083 11.6988 7.80567 11.6988H10.6278C10.9726 11.6988 11.2524 11.9725 11.2524 12.3099V15.5253H14.7147V9.36421ZM13.4443 3.6812C13.0995 3.6812 12.8197 3.40747 12.8197 3.07C12.8197 2.73254 13.0995 2.45889 13.4443 2.45889H15.3392C15.6841 2.45889 15.9639 2.73254 15.9639 3.07V4.92408C15.9639 5.26155 15.6841 5.53528 15.3392 5.53528C14.9944 5.53528 14.7147 5.26155 14.7147 4.92408V3.6812H13.4443ZM1.60089 9.28463L9.21672 2.28427L16.8325 9.28463C17.083 9.5153 17.4776 9.50346 17.7134 9.25841C17.9491 9.01316 17.9371 8.62712 17.6865 8.39633L9.64368 1.00351C9.40574 0.784061 9.03095 0.781313 8.78967 1.00351L0.746865 8.39633C0.496325 8.62712 0.484225 9.01316 0.720065 9.25841C0.955805 9.50346 1.35035 9.5153 1.60089 9.28463Z', fillColor: '#484848', width: '18', height: '17', viewBox: '0 0 18 17', fill: 'none', fillRule: 'evenodd', clipRule: 'evenodd', page: 0 },
  // { name: 'Profile', url: '/dashboard/home', icon: <Home />, page: 0 },
  { name: 'My Alerts', url: AppRoutes.MY_ALERT, icon: <MyAlerts />, page: 0 },
  { name: 'My Profile', url: AppRoutes.ACCOUNT_SETTINGS, icon: <Profile />, page: 1 },
  { name: 'Membership', url: AppRoutes.MEMBERSHIP, icon: <Subscription />, page: 2 }
  // { name: 'Logout', url: '/', icon: <Logout />, page: 1 }
]

export const sidebarMenuMobile = [
  { name: 'Map View', url: AppRoutes.LOCATION, icon: '', page: 9 },
  { name: 'My Alerts', url: AppRoutes.MY_ALERT, icon: <MyAlerts />, page: 0 },
  { name: 'Profile', url: AppRoutes.ACCOUNT_SETTINGS, icon: <Profile />, page: 1 },
  { name: 'Membership', url: AppRoutes.MEMBERSHIP, icon: <Subscription />, page: 2 },
  { name: 'News & Advice', url: AppRoutes.NEWS_AND_ADVICE, icon: '', page: 6 },
  { name: 'How It Works', url: AppRoutes.HOW_IT_WORKS, icon: '', page: 7 }
]

export const sidebarMenuMobileNonLoggedIn = [
  // { name: 'News & Advice', url: '/news-and-advice', icon: '', page: 6 },
  // { name: 'How It Works', url: '/how-it-works', icon: '', page: 7 },
  // { name: 'Pricing', url: '/pricing', icon: '', page: 8 }
]
export const countryOptions = [
  {
    text: 'Austria',
    key: 'AT',
    value: 'AT',
    currency: 'EUR'
  },
  {
    text: 'Belgium',
    key: 'BE',
    value: 'BE',
    currency: 'EUR'
  },
  {
    text: 'Denmark',
    key: 'DK',
    value: 'DK',
    currency: 'DKK'
  },
  {
    text: 'Finland',
    key: 'FI',
    value: 'FI',
    currency: 'EUR'
  },
  {
    text: 'France',
    key: 'FR',
    value: 'FR',
    currency: 'EUR'
  },
  {
    text: 'Germany',
    key: 'DE',
    value: 'DE',
    currency: 'EUR'
  },
  {
    text: 'Ireland',
    key: 'IE',
    value: 'IE',
    currency: 'EUR'
  },
  {
    text: 'Italy',
    key: 'IT',
    value: 'IT',
    currency: 'EUR'
  },
  {
    text: 'Luxembourg',
    key: 'LU',
    value: 'LU',
    currency: 'EUR'
  },
  {
    text: 'Netherlands',
    key: 'NL',
    value: 'NL',
    currency: 'EUR'
  },
  {
    text: 'Norway',
    key: 'NO',
    value: 'NO',
    currency: 'NOK'
  },
  {
    text: 'Portugal',
    key: 'PT',
    value: 'PT',
    currency: 'EUR'
  },
  {
    text: 'Spain',
    key: 'ES',
    value: 'ES',
    currency: 'EUR'
  },
  {
    text: 'Sweden',
    key: 'SE',
    value: 'SE',
    currency: 'SEK'
  },
  {
    text: 'Switzerland',
    key: 'CH',
    value: 'CH',
    currency: 'CHF'
  },
  {
    text: 'United Kingdom',
    key: 'GB',
    value: 'GB',
    currency: 'GBP'
  }
]

export const currencyOptions = [
  {
    text: 'Euro',
    value: 'EUR',
    key: 'EUR'
  },
  {
    text: 'Danish Krone',
    value: 'DKK',
    key: 'DKK'
  },
  {
    text: 'Norwegian krone',
    value: 'NOK',
    key: 'NOK'
  },
  {
    text: 'Swedish Krona',
    value: 'SEK',
    key: 'SEK'
  },
  {
    text: 'Swiss Franc',
    value: 'CHF',
    key: 'CHF'
  },
  {
    text: 'British Pound Sterling',
    value: 'GBP',
    key: 'GBP'
  },
  {
    text: 'United States Dollar',
    value: 'USD',
    key: 'USD'
  }
]


export const sourceCodeOption = [
  // {
  //   label: intl(mapViewMessages.directlyOperatedByBA, journeyType !== 'return' && flyToSearch === 'travelTo' ? 'from' : 'to'),
  //   option: [{}]
  // },
  {
    label: 'Airports', options: [{
      value: 'MAN',
      label: 'Manchester (MAN)',
      search: 'Manchester (United Kingdom)-MAN'
    },
    {
      value: 'EDI',
      label: 'Edinburgh (EDI)',
      search: 'Edinburgh (United Kingdom)-EDI'
    },
    {
      value: 'JNB',
      label: 'Johannesburg (JNB)',
      search: 'Johannesburg (South Africa)-JNB'
    },
    {
      value: 'CPT',
      label: 'Cape Town (CPT)',
      search: 'Cape Town (South Africa)-CPT'
    },
    {
      value: 'DUR',
      label: 'Durban (DUR)',
      search: 'Durban (South Africa)-DUR'
    },
    {
      value: 'SOU',
      label: 'Southampton (SOU)',
      search: 'Southampton -SOU'
    },
    {
      value: 'PLZ',
      label: 'Port Elizabeth (PLZ)',
      search: 'Port Elizabeth (South Africa)-PLZ'
    }].sort(sortObjectArray)
  },
  {
    label: 'Cities with multiple airports',
    options: [{
      value: 'LON',
      label: 'London (LGW, LHR, LCY, LTN, SEN, STN)',
      search: 'London (LGW, LHR, LCY, LTN, SEN, STN)-LON'
    }].sort(sortObjectArray)
  }
]

export const sourceCodeOptionVirginAtlantic = [
  {
    label: 'Airports', options: [{
      value: 'MAN',
      label: 'Manchester (MAN)',
      search: 'Manchester (United Kingdom)-MAN'
    },
    {
      value: 'LGW',
      label: 'London (LGW)',
      search: 'London (United Kingdom)-LGW'
    },
    {
      value: 'LHR',
      label: 'London (LHR)',
      search: 'London (United Kingdom)-LHR'
    },
    {
      value: 'ATL',
      label: 'Atlanta (ATL)',
      search: 'Atlanta (United States)-ATL'
    },
    {
      value: 'BOS',
      label: 'Boston (BOS)',
      search: 'Boston (United States)-BOS'
    },
    {
      value: 'JFK',
      label: 'New York (JFK)',
      search: 'New York (United States)-JFK'
    },
    {
      value: 'MCO',
      label: 'Orlando (MCO)',
      search: 'Orlando (United States) -MCO'
    },
    {
      value: 'ANU',
      label: 'St. John\'s (ANU)',
      search: 'St. John\'s (Antigua and Barbuda) -ANU'
    },
    {
      value: 'BGI',
      label: 'Christ Church  (BGI)',
      search: 'Christ Church (Barbados) -BGI'
    },
    {
      value: 'GND',
      label: 'Saint George (GND)',
      search: 'Saint George (Grenada) -GND'
    },
    {
      value: 'MBJ',
      label: 'Montego Bay (MBJ)',
      search: 'Montego Bay (Jamaica) -MBJ'
    },
    {
      value: 'LAS',
      label: 'Las Vegas (LAS)',
      search: 'Las Vegas (United States)-LAS'
    }].sort(sortObjectArray)
  }
]

export const signupFlightsOptions = [
  {
    value: 'blue',
    text: 'Blue',
    key: 1
  },
  {
    value: 'bronze',
    text: 'Bronze',
    key: 2
  },
  {
    value: 'silver',
    text: 'Silver',
    key: 3
  },
  {
    value: 'gold',
    text: 'Gold',
    key: 4
  },
  {
    value: 'premier',
    text: 'Gold Guest List',
    key: 5
  },
  {
    value: '_blue',
    text: 'I\'m not a BA Executive Club member',
    key: 6
  }
]

export const calendarPageData =
{
  '2020-04-27': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    peconomey: {
      seat: 6,
      point: '6000k'
    },
    peak: false
  }
  ,
  '2020-04-28': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    first: {
      seat: 5,
      point: '2000k'
    },
    bussines: {
      seat: 3,
      point: '3000k'
    },
    peak: true
  }
  ,
  '2020-05-02': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    first: {
      seat: 5,
      point: '2000k'
    },
    peconomey: {
      seat: 6,
      point: '6000k'
    },
    bussines: {
      seat: 3,
      point: '3000k'
    },
    peak: false
  },
  '2020-05-04': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    peak: true
  },
  '2020-05-06': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    first: {
      seat: 5,
      point: '2000k'
    },
    peconomey: {
      seat: 6,
      point: '6000k'
    },
    bussines: {
      seat: 3,
      point: '3000k'
    },
    peak: true
  },
  '2020-05-08': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    peconomey: {
      seat: 6,
      point: '6000k'
    },
    bussines: {
      seat: 3,
      point: '3000k'
    },
    peak: true
  },
  '2020-05-11': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    first: {
      seat: 5,
      point: '2000k'
    },
    peak: true
  },
  '2020-05-13': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    first: {
      seat: 5,
      point: '2000k'
    },
    peconomey: {
      seat: 6,
      point: '6000k'
    },
    peak: true
  },
  '2020-05-15': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    first: {
      seat: 5,
      point: '2000k'
    },
    peconomey: {
      seat: 6,
      point: '6000k'
    },
    bussines: {
      seat: 3,
      point: '3000k'
    },
    peak: false
  },
  '2020-05-16': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    first: {
      seat: 5,
      point: '2000k'
    },
    peconomey: {
      seat: 6,
      point: '6000k'
    },
    bussines: {
      seat: 3,
      point: '3000k'
    },
    peak: true
  },
  '2020-05-17': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    first: {
      seat: 5,
      point: '2000k'
    },
    peconomey: {
      seat: 6,
      point: '6000k'
    },
    bussines: {
      seat: 3,
      point: '3000k'
    },
    peak: false
  },
  '2020-05-19': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    first: {
      seat: 5,
      point: '2000k'
    },
    peconomey: {
      seat: 6,
      point: '6000k'
    },
    bussines: {
      seat: 3,
      point: '3000k'
    },
    peak: true
  },
  '2020-05-21': {
    economey: {
      seat: 1,
      point: '3000k'
    },
    first: {
      seat: 5,
      point: '2000k'
    },
    peconomey: {
      seat: 6,
      point: '6000k'
    },
    bussines: {
      seat: 3,
      point: '3000k'
    },
    peak: true
  }
}

export const planCurrency = [{
  text: 'GBP',
  key: 'GB',
  value: 'GBP',
  currency: 'GBP'
},
{
  text: 'EUR',
  key: 'EUR',
  value: 'EUR',
  currency: 'EUR'
},
{
  text: 'USD',
  key: 'USD',
  value: 'USD',
  currency: 'USD'
}]

export const airlines = [
  {
    text: 'American Airlines',
    key: 'AT',
    value: 'AA'
  },
  {
    text: 'British Airways',
    key: 'BA',
    value: 'BA'
  }
]

export const britishAirwaysClasses = [
  {
    cabinClass: 'economy',
    color: '#2044FF',
    title: 'Economy'
  },
  {
    cabinClass: 'premium',
    color: '#FEA41D',
    title: 'Premium Economy'
  }, {
    cabinClass: 'business',
    color: '#A400F1',
    title: 'Business'
  },
  {
    cabinClass: 'first',
    color: '#F31973',
    title: 'First'
  }
]

export const checkRoutesForScript = [AppRoutes.THANK_YOU, AppRoutes.SILVER_SIGNUP_THANKYOU, AppRoutes.GOLD_SIGNUP_THANKYOU, AppRoutes.BRONZE_SIGNUP_THANKYOU, AppRoutes.PAGE_NOT_FOUND]

export const calendarMonthsLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export const mapJson =
{
  source: {
    'city_name': 'London',
    'code': 'LON',
    'country_name': 'United Kingdom',
    'latitude': 51.148056,
    'longitude': -0.190278,
    'name': 'London'
  },
  available_destinations: [
    {
      'city_name': 'Abuja',
      'code': 'ABV',
      'country_name': 'Nigeria',
      'latitude': 9.006792,
      'longitude': 7.263172,
      'name': 'Nnamdi Azikiwe Intl',
      'available_classes': {
        business: true,
        economy: true,
        first: true,
        premium: true
      },
      'availability': {
        'outbound': {
          '2020-12-20': {
            'business': {
              'seats': 9,
              'points': 31250
            },
            'economy': {
              'seats': 9,
              'points': 10000
            },
            'first': {
              'seats': 3,
              'points': 42500
            },
            'peak': false
          },
          '2020-12-21': {
            'business': {
              'seats': 9,
              'points': 31250
            },
            'economy': {
              'seats': 9,
              'points': 10000
            },
            'first': {
              'seats': 3,
              'points': 42500
            },
            'peak': false
          }
        },
        'inbound': {
          '2020-12-21': {
            'business': {
              'seats': 9,
              'points': 2344
            },
            'economy': {
              'seats': 9,
              'points': 1233000
            },
            'first': {
              'seats': 3,
              'points': 2555
            },
            'peak': false
          }
        }
      }
    },
    {
      'city_name': 'Hong Kong',
      'code': 'HKG',
      'country_name': 'Hong Kong',
      'latitude': 22.308919,
      'longitude': 113.914603,
      'name': 'Hong Kong Intl',
      'available_classes': {
        business: true,
        economy: false,
        first: false,
        premium: true
      },
      'availability': {
        'outbound': {
          '2020-12-20': {
            'business': {
              'seats': 9,
              'points': 31250
            },
            'economy': {
              'seats': 9,
              'points': 40000
            },
            'first': {
              'seats': 3,
              'points': 42500
            },
            'peak': false
          },
          '2020-12-21': {
            'business': {
              'seats': 9,
              'points': 31250
            },
            'economy': {
              'seats': 9,
              'points': 230000
            },
            'first': {
              'seats': 3,
              'points': 42500
            },
            'peak': false
          },
          '2020-12-22': {
            'business': {
              'seats': 9,
              'points': 31250
            },
            'economy': {
              'seats': 9,
              'points': 22000
            },
            'first': {
              'seats': 3,
              'points': 42500
            },
            'peak': true
          },
          '2020-12-23': {
            'business': {
              'seats': 9,
              'points': 31250
            },
            'economy': {
              'seats': 9,
              'points': 10000
            },
            'first': {
              'seats': 3,
              'points': 42500
            },
            'peak': false
          },
          '2020-12-24': {
            'business': {
              'seats': 9,
              'points': 31250
            },
            'economy': {
              'seats': 9,
              'points': 4000
            },
            'first': {
              'seats': 3,
              'points': 42500
            },
            'peak': false
          },
          '2020-12-25': {
            'business': {
              'seats': 9,
              'points': 31250
            },
            'economy': {
              'seats': 9,
              'points': 5000
            },
            'first': {
              'seats': 3,
              'points': 42500
            },
            'peak': false
          },
          '2020-12-26': {
            'business': {
              'seats': 9,
              'points': 31250
            },
            'economy': {
              'seats': 9,
              'points': 6000
            },
            'first': {
              'seats': 3,
              'points': 42500
            },
            'peak': true
          },
          '2020-12-27': {
            'business': {
              'seats': 9,
              'points': 31250
            },
            'economy': {
              'seats': 9,
              'points': 565656
            },
            'first': {
              'seats': 3,
              'points': 565656
            },
            'peak': false
          },
          '2020-12-28': {
            'business': {
              'seats': 9,
              'points': 3333
            },
            'economy': {
              'seats': 9,
              'points': 100065560
            },
            'first': {
              'seats': 3,
              'points': 6565656
            },
            'peak': false
          },
          '2020-12-29': {
            'business': {
              'seats': 9,
              'points': 54444
            },
            'economy': {
              'seats': 9,
              'points': 66666
            },
            'first': {
              'seats': 3,
              'points': 34345
            },
            'peak': true
          }
        },
        'inbound': {
          '2021-01-01': {
            'business': {
              'seats': 9,
              'points': 3535
            },
            'economy': {
              'seats': 9,
              'points': 56765
            },
            'first': {
              'seats': 3,
              'points': 45656
            },
            'peak': false
          }
        }
      }
    },
    {
      'city_name': 'Atlanta',
      'code': 'ATL',
      'country_name': 'United States',
      'latitude': 33.636719,
      'longitude': -84.428067,
      'name': 'Hartsfield Jackson Atlanta Intl',
      'available_classes': {
        business: true,
        economy: true,
        first: false,
        premium: true
      },
      'availability': {
        'outbound': {
          '2020-12-20': {
            'business': {
              'seats': 9,
              'points': 234324
            },
            'economy': {
              'seats': 9,
              'points': 4420
            },
            'first': {
              'seats': 3,
              'points': 433400
            },
            'peak': false
          },
          '2020-12-21': {
            'business': {
              'seats': 9,
              'points': 344250
            },
            'economy': {
              'seats': 9,
              'points': 210000
            },
            'first': {
              'seats': 3,
              'points': 10000
            },
            'peak': false
          },
          '2020-12-23': {
            'business': {
              'seats': 9,
              'points': 344250
            },
            'economy': {
              'seats': 9,
              'points': 210000
            },
            'first': {
              'seats': 3,
              'points': 10000
            },
            'peak': false
          }
        }
      }
    }
  ]
}

export const disposalEmails = ['yopmail', 'mailinator', 'droverpzq', 'guerrillamail', 'spam4', 'grr', 'sharklasers',
  'firemailbox', 'mywrld', 'getnada', 'boximail', 'abyssmail', 'clrmail', 'dropjar', 'getairmail', 'givmail', 'inboxbear', 'tafmail',
  'vomoto', 'zetmail', 'robot-mail']

export const silverPlansList = [
    'Silver plan GBP yearly',
    'Silver plan GBP monthly',
    'Elite GBP Annually',
    'Elite EUR',
    'Elite GBP One Month Free',
    'Elite USD Standard',
    'Elite GBP Standard',
    'Elite GBP',
    'Elite USD',
    'Elite GBP GC Annually',
    'Elite USD GC',
    'Elite EUR GC',
    'Elite GBP GC'
  ]

export const SubscriptionPlan = {
  SILVER_PLAN: 'Silver plan GBP monthly',
  GOLD_PLAN: 'Gold plan GBP monthly launch',
  GOLD_FREE: 'Gold Free'
}

export const GoogleAdsParam = [
  'utm_medium',
  'utm_source',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'ref',
  'dclid',
  'fbclid',
  'gclid',
  'gclsrc',
  'msclkid',
  'zanpid',
  '_ga',
  'gtm_debug',
  'cid',
  '_se'
]


export const BritishAirwaysAvailableClass = ['economy', 'premium_economy', 'business', 'first']

export const virginAtlanticAvailableClass = ['economy', 'premium_economy', 'upper']

export const virginAtlanticClass = [
  {
    cabinClass: 'economy',
    color: '#2044FF',
    title: 'Economy'
  },
  {
    cabinClass: 'premium',
    color: '#FEA41D',
    title: 'Premium Economy'
  }, {
    cabinClass: 'upper',
    color: '#A400F1',
    title: 'Upper'
  }
]

export const availableAirways = {
  BRITISH_AIRWAYS: 'british-airways',
  VIRGIN_ATLANTIC: 'virgin-atlantic'
}

export const GAParameters = [
  'utm_medium',
  'utm_source',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid'
]
export const calendarDefaultRouteSearcParams = {
    aCode: 'BA',
    dId: 'LON',
    dPlace: 'London (LGW, LHR, LCY, LTN, SEN, STN)',
    airlineMembership: 'blue',
    airlineSelected: 'BA_blue',
    aId: 'NYC',
    aPlace: 'New York City (JFK, EWR, LGA, HPN)',
    business: 'true',
    economy: 'true',
    first: 'true',
    premium: 'true',
    jType: 'return',
    membership: 'blue',
    numberOfPassengers: '1',
    tValue: 'economy',
    tclass: 'Economy'
  }

  export const RecommendedBronze = [
    'elite-plan-pound-monthly',
    'elite-plan-pound-yearly'
  ]

  export const RecommendedSilverMonthly = [
    'elite-plan-pound-yearly',
    'gold-plan-gbp-monthly-launch'
  ]

  export const RecommendedGoldMonthly = [
    'elite-plan-pound-yearly',
    'gold-plan-yearly-launch-promotion'
  ]

  export const RecommendedSilverYearly = [
   'gold-plan-yearly-launch-promotion'
  ]

  export const SilverThankyouRoutes = [
   AppRoutes.SILVER_FREE_MONTHLY,
   AppRoutes.SILVER_FREE_YEARLY,
   AppRoutes.SILVER_PAID_MONTHLY,
   AppRoutes.SILVER_PAID_YEARLY,
   AppRoutes.UPGRADE_SILVER_PAID_MONTHLY,
   AppRoutes.UPGRADE_SILVER_PAID_YEARLY,
   AppRoutes.CANCEL_SILVER_TRIAL,
   AppRoutes.DOWNGRADE_SILVER_TO_BRONZE,
   AppRoutes.DOWNGRADE_SILVER_TO_GOLD
  ]

  export const GoldThankyouRoutes = [
    AppRoutes.GOLD_FREE_MONTHLY,
    AppRoutes.GOLD_FREE_YEARLY,
    AppRoutes.GOLD_PAID_MONTHLY,
    AppRoutes.GOLD_PAID_YEARLY,
    AppRoutes.UPGRADE_GOLD_PAID_MONTHLY,
    AppRoutes.UPGRADE_GOLD_PAID_YEARLY,
    AppRoutes.CANCEL_GOLD_TRIAL,
    AppRoutes.DOWNGRADE_GOLD_TO_BRONZE
  ]

  export const profileCardDetails = [
    {
      header: 'Personal Info',
      icon: <UserIcon/>,
      activeTab: 1
    },
    {
      header: 'Notification Settings',
        icon: <ProfileBell/>,
      activeTab: 2
    },
    {
      header: 'Change Password',
        icon: <LockPassword/>,
      activeTab: 3
    },
    {
      header: 'Manage Contact Details',
      icon: <ContactIcon/>,
      activeTab: 4
    },
    {
      header: 'Airline Membership Tier',
      icon: <AirlineIcon/>,
      activeTab: 5
    }
  ]

  export const ageBandOption = [
    {
      value: '17-20',
      label: '17-20'
    },
    {
      value: '21-29',
      label: '21-29'
    },
    {
      value: '30-39',
      label: '30-39'
    },
    {
      value: '40-49',
      label: '40-49'
    },
    {
      value: '50-59',
      label: '50-59'
    },
    {
      value: '60-69',
      label: '60-69'
    },
    {
      value: '70+',
      label: '70+'
    }
  ]

  export const approxNumberFlights = [
    {
      value: '1-3',
      label: '1-3'
    },
    {
      value: '3-6',
      label: '3-6'
    },
    {
      value: '6+',
      label: '6+'
    }
  ]

  export const genderOptions = [
    {
      value: 'Male',
      label: 'Male'
    },
    {
      value: 'Female',
      label: 'Female'
    },
    {
      value: 'Other',
      label: 'I\'d prefer not to say'
    }
  ]

  export const travelAbroadOptions = [
    {
      value: 'Unlikely',
      label: 'Unlikely'
    },
    {
      value: 'Likely',
      label: 'Likely'
    },
    {
      value: 'Very Likely',
      label: 'Very Likely'
    }
  ]

 export const digitRegex = /(?=.*\d)/g
 export const oneLowerCase = /(?=.*[a-z])/g
 export const oneUpperCase = /(?=.*[A-Z])/g
 export const specialCharacter = /(?=.*[@$!%*#?&])/g

 export const defaultBACabinClass = {
  economy: true,
  premium: true,
  first: true,
  business: true
 }


 export const airlineName = {
  BA: { AIRWAYS_NAME: 'british_airways', CODE: 'BA', AIRLINE: 'British Airways' },
  VA: { AIRWAYS_NAME: 'virgin_atlantic', CODE: 'VA', AIRLINE: 'Virgin Atlantic' },
  AA: { AIRWAYS_NAME: 'american_airlines', CODE: 'AA', AIRLINE: 'American Airlines' }
}

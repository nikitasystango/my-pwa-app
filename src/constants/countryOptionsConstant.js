import { sortObjectArray } from 'utils/helpers'

export const countryOptionsConstant = [
  {
    text: 'United Kingdom',
    value: 'GB',
    key: 'GB',
    currency: 'GBP'
  },
  {
    text: 'United States',
    value: 'US',
    key: 'US',
    currency: 'USD'
  },
  {
    text: 'India',
    value: 'IN',
    key: 'IN',
    currency: 'INR'
  },
  {
    text: 'Canada',
    value: 'CA',
    key: 'CA',
    currency: 'CAD'
  },
  {
    text: 'Luxembourg',
    value: 'LU',
    key: 'LU',
    currency: 'EUR'
  },
  {
    text: 'Paraguay',
    value: 'PY',
    key: 'PY',
    currency: 'PYG'
  },
  {
    text: 'Andorra',
    value: 'AD',
    key: 'AD',
    currency: 'EUR'
  },
  {
    text: 'French Polynesia',
    value: 'PF',
    key: 'PF',
    currency: 'EUR'
  },
  {
    text: 'Nigeria',
    value: 'NG',
    key: 'NG',
    currency: 'EUR'
  },
  {
    text: 'South Africa',
    value: 'ZA',
    key: 'ZA',
    currency: 'ZAR'
  },
  {
    text: 'Denmark',
    value: 'DK',
    key: 'DK',
    currency: 'DKK'
  },
  {
    text: 'Russia',
    value: 'RU',
    key: 'RU',
    currency: 'RUB'
  },
  {
    text: 'Lietuva',
    value: 'LTU',
    key: 'LTU',
    currency: 'EUR'
  },
  {
    text: 'Lithuania',
    value: 'LT',
    key: 'LT',
    currency: 'EUR'
  },
  {
    text: 'Israel',
    value: 'IL',
    key: 'IL',
    currency: 'EUR'
  },
  {
    text: 'Mexico',
    value: 'MX',
    key: 'MX',
    currency: 'MXN'
  },
  {
    text: 'Singapore',
    value: 'SG',
    key: 'SG',
    currency: 'SGD'
  },
  {
    text: 'Malaysia',
    value: 'MY',
    key: 'MY',
    currency: 'MYR'
  },
  {
    text: 'Vietnam',
    value: 'VN',
    key: 'VN',
    currency: 'VND'
  },
  {
    text: 'Qatar',
    value: 'QA',
    key: 'QA',
    currency: 'QAR'
  },
  {
    text: 'United Arab Emirates',
    value: 'AE',
    key: 'AE',
    currency: 'AED'
  },
  {
    text: 'Croatia',
    value: 'HR',
    key: 'HR',
    currency: 'HRK'
  },
  {
    text: 'Uruguay',
    value: 'UY',
    key: 'UY',
    currency: 'UYU'
  },
  {
    text: 'Japan',
    value: 'JP',
    key: 'JP',
    currency: 'JPY'
  },
  {
    text: 'Bahrain',
    value: 'BH',
    key: 'BH',
    currency: 'BHD'
  },
  {
    text: 'Sweden',
    value: 'SE',
    key: 'SE',
    currency: 'SEK'
  },
  {
    text: 'Italy',
    value: 'IT',
    key: 'IT',
    currency: 'EUR'
  },
  {
    text: 'Spain',
    value: 'ES',
    key: 'ES',
    currency: 'EUR'
  },
  {
    text: 'China',
    value: 'CN',
    key: 'CN',
    currency: 'CNY'
  },
  {
    text: 'France',
    value: 'FR',
    key: 'FR',
    currency: 'EUR'
  },
  {
    text: 'Bosnia and Herzegovina',
    value: 'BA',
    key: 'BA',
    currency: 'BAM'
  },
  {
    text: 'Jordan',
    value: 'JO',
    key: 'JO',
    currency: 'JOD'
  },
  {
    text: 'Sri Lanka',
    value: 'LK',
    key: 'LK',
    currency: 'LKR'
  },
  {
    text: 'Switzerland',
    value: 'CH',
    key: 'CH',
    currency: 'CHF'
  },
  {
    text: 'Slovenia',
    value: 'SI',
    key: 'SI',
    currency: 'SIT'
  },
  {
    text: 'Algeria',
    value: 'DZ',
    key: 'DZ',
    currency: 'DZD'
  },
  {
    text: 'Venezuela, Bolivarian Republic of Venezuela',
    value: 'VE',
    key: 'VE',
    currency: 'VES'
  },
  {
    text: 'Ireland',
    value: 'IE',
    key: 'IE',
    currency: 'EUR'
  },
  {
    text: 'Romania',
    value: 'RO',
    key: 'RO',
    currency: 'RON'
  },
  {
    text: 'Iran, Islamic Republic of Persian Gulf',
    value: 'IR',
    key: 'IR',
    currency: 'EUR'
  },
  {
    text: 'Latvia',
    value: 'LV',
    key: 'LV',
    currency: 'EUR'
  },
  {
    text: 'Turkey',
    value: 'TR',
    key: 'TR',
    currency: 'TRY'
  },
  {
    text: 'Portugal',
    value: 'PT',
    key: 'PT',
    currency: 'EUR'
  },
  {
    text: 'Indonesia',
    value: 'ID',
    key: 'ID',
    currency: 'IDR'
  },
  {
    text: 'Czech Republic',
    value: 'CZ',
    key: 'CZ',
    currency: 'CZK'
  },
  {
    text: 'Malta',
    value: 'MT',
    key: 'MT',
    currency: 'EUR'
  },
  {
    text: 'Madagascar',
    value: 'MG',
    key: 'MG',
    currency: 'MGA'
  },
  {
    text: 'Thailand',
    value: 'TH',
    key: 'TH',
    currency: 'THB'
  },
  {
    text: 'Peru',
    value: 'PE',
    key: 'PE',
    currency: 'PEN'
  },
  {
    text: 'Nicaragua',
    value: 'NI',
    key: 'NI',
    currency: 'NIO'
  },
  {
    text: 'Chile',
    value: 'CL',
    key: 'CL',
    currency: 'CLP'
  },
  {
    text: 'Finland',
    value: 'FI',
    key: 'FI',
    currency: 'EUR'
  },
  {
    text: 'Jamaica',
    value: 'JM',
    key: 'JM',
    currency: 'JMD'
  },
  {
    text: 'Slovakia',
    value: 'SK',
    key: 'SK',
    currency: 'EUR'
  },
  {
    text: 'Norway',
    value: 'NO',
    key: 'NO',
    currency: 'NOK'
  },
  {
    text: 'Brazil',
    value: 'BR',
    key: 'BR',
    currency: 'BRL'
  },
  {
    text: 'Panama',
    value: 'PA',
    key: 'PA',
    currency: 'PAB'
  },
  {
    text: 'Poland',
    value: 'PL',
    key: 'PL',
    currency: 'EUR'
  },
  {
    text: 'Australia',
    value: 'AU',
    key: 'AU',
    currency: 'AUD'
  },
  {
    text: 'Taiwan',
    value: 'TW',
    key: 'TW',
    currency: 'TWD'
  },
  {
    text: 'Bangladesh',
    value: 'BD',
    key: 'BD',
    currency: 'BDT'
  },
  {
    text: 'Ecuador',
    value: 'EC',
    key: 'EC',
    currency: 'EUR'
  },
  {
    text: 'Egypt',
    value: 'EG',
    key: 'EG',
    currency: 'EGP'
  },
  {
    text: 'Austria',
    value: 'AT',
    key: 'AT',
    currency: 'EUR'
  },
  {
    text: 'Hong Kong',
    value: 'HK',
    key: 'HK',
    currency: 'HKD'
  },
  {
    text: 'Germany',
    value: 'DE',
    key: 'DE',
    currency: 'EUR'
  },
  {
    text: 'Colombia',
    value: 'CO',
    key: 'CO',
    currency: 'COP'
  },
  {
    text: 'Lebanon',
    value: 'LB',
    key: 'LB',
    currency: 'LBP'
  },
  {
    text: 'Greece',
    value: 'GR',
    key: 'GR',
    currency: 'EUR'
  },
  {
    text: 'Argentina',
    value: 'AR',
    key: 'AR',
    currency: 'ARS'
  },
  {
    text: 'Mauritius',
    value: 'MU',
    key: 'MU',
    currency: 'MUR'
  },
  {
    text: 'Estonia',
    value: 'EE',
    key: 'EE',
    currency: 'EUR'
  },
  {
    text: 'Philippines',
    value: 'PH',
    key: 'PH',
    currency: 'PHP'
  },
  {
    text: 'Hungary',
    value: 'HU',
    key: 'HU',
    currency: 'HUF'
  },
  {
    text: 'Ukraine',
    value: 'UA',
    key: 'UA',
    currency: 'UAH'
  },
  {
    text: 'Belgium',
    value: 'BE',
    key: 'BE',
    currency: 'EUR'
  },
  {
    text: 'Netherlands',
    value: 'NL',
    key: 'NL',
    currency: 'EUR'
  },
  {
    text: 'Pakistan',
    value: 'PK',
    key: 'PK',
    currency: 'PKR'
  },
  {
    text: 'Morocco',
    value: 'MA',
    key: 'MA',
    currency: 'MAD'
  },
  {
    text: 'Nepal',
    value: 'NP',
    key: 'NP',
    currency: 'NPR'
  },
  {
    text: 'Tunisia',
    value: 'TN',
    key: 'TN',
    currency: 'TND'
  },
  {
    text: 'New Zealand',
    value: 'NZ',
    key: 'NZ',
    currency: 'NZD'
  }
].sort(sortObjectArray)

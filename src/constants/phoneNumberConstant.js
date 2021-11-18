import { sortObjectArray } from 'utils/helpers'

export const phoneNumberConstants = [
  {
    text: 'United Kingdom',
    dial_code: '+44',
    value: '44',
    code: 'GB',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg',
    inputMask: '9999 999999',
    maxLength: '10',
    minLength: '7'
  },
  {
    text: 'United States',
    dial_code: '+1',
    value: '1',
    code: 'US',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    inputMask: '(999) 999-9999',
    maxLength: '10',
    minLength: '7'
  },
  {
    text: 'India',
    dial_code: '+91',
    value: '91',
    code: 'IN',
    flag: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg',
    inputMask: '99999-99999',
    maxLength: '10',
    minLength: '7'
  },
  {
    text: 'Canada',
    dial_code: '+1',
    value: '1',
    code: 'CA',
    flag: 'https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg',
    inputMask: '(999) 999-9999',
    maxLength: '10',
    minLength: '7'
  },
  {
    text: 'Luxembourg',
    dial_code: '+352',
    value: '352',
    code: 'LU',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Paraguay',
    dial_code: '+595',
    value: '595',
    code: 'PY',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Paraguay.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Andorra',
    dial_code: '+376',
    value: '376',
    code: 'AD',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'French Polynesia',
    dial_code: '+689',
    value: '689',
    code: 'PF',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Flag_of_French_Polynesia.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Nigeria',
    dial_code: '+234',
    value: '234',
    code: 'NG',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'South Africa',
    dial_code: '+27',
    value: '27',
    code: 'ZA',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Denmark',
    dial_code: '+45',
    value: '45',
    code: 'DK',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg',
    inputMask: '99 99 99 99',
    maxLength: '8',
    minLength: '4'
  },
  {
    text: 'Russia',
    dial_code: '+7',
    value: '7',
    code: 'RU',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/320px-Flag_of_Russia.svg.png',
    inputMask: '(999) 999-99-99',
    maxLength: '10',
    minLength: '7'
  },
  {
    text: 'Lithuania',
    dial_code: '+370',
    value: '370',
    code: 'LT',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Lithuania.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Israel',
    dial_code: '+972',
    value: '972',
    code: 'IL',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg',
    inputMask: '999 999 9999',
    maxLength: '10',
    minLength: '7'
  },
  {
    text: 'Mexico',
    dial_code: '+52',
    value: '52',
    code: 'MX',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg',
    inputMask: '999 999 9999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Singapore',
    dial_code: '+65',
    value: '65',
    code: 'SG',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg',
    inputMask: '9999-9999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Malaysia',
    dial_code: '+60',
    value: '60',
    code: 'MY',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg',
    inputMask: '99-9999-9999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Vietnam',
    dial_code: '+84',
    value: '84',
    code: 'VN',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Qatar',
    dial_code: '+974',
    value: '974',
    code: 'QA',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'United Arab Emirates',
    dial_code: '+971',
    value: '971',
    code: 'AE',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Croatia',
    dial_code: '+385',
    value: '385',
    code: 'HR',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Uruguay',
    dial_code: '+598',
    value: '598',
    code: 'UY',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Japan',
    dial_code: '+81',
    value: '81',
    code: 'JP',
    flag: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg',
    inputMask: '99 9999 9999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Bahrain',
    dial_code: '+973',
    value: '973',
    code: 'BH',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Bahrain.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Sweden',
    dial_code: '+46',
    value: '46',
    code: 'SE',
    flag: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg',
    inputMask: '(999) 999-999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Italy',
    dial_code: '+39',
    value: '39',
    code: 'IT',
    flag: 'https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg',
    inputMask: '999 9999999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Spain',
    dial_code: '+34',
    value: '34',
    code: 'ES',
    flag: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg',
    inputMask: '999 999 999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'China',
    dial_code: '+86',
    value: '86',
    code: 'CN',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    inputMask: '99-999999999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'France',
    dial_code: '+33',
    value: '33',
    code: 'FR',
    flag: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg',
    inputMask: '9 99 99 99 99',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Bosnia and Herzegovina',
    dial_code: '+387',
    value: '387',
    code: 'BA',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Jordan',
    dial_code: '+962',
    value: '962',
    code: 'JO',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Jordan.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Sri Lanka',
    dial_code: '+94',
    value: '94',
    code: 'LK',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Switzerland',
    dial_code: '+41',
    value: '41',
    code: 'CH',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Flag_of_Switzerland_%28Pantone%29.svg',
    inputMask: '99 999 99 99',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Slovenia',
    dial_code: '+386',
    value: '386',
    code: 'SI',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Slovenia.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Algeria',
    dial_code: '+213',
    value: '213',
    code: 'DZ',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Venezuela',
    dial_code: '+58',
    value: '58',
    code: 'VE',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Venezuela.svg/320px-Flag_of_Venezuela.svg.png',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Ireland',
    dial_code: '+353',
    value: '353',
    code: 'IE',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg',
    inputMask: '99 9999999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Romania',
    dial_code: '+40',
    value: '40',
    code: 'RO',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Iran',
    dial_code: '+98',
    value: '98',
    code: 'IR',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg',
    inputMask: '999 999 9999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Latvia',
    dial_code: '+371',
    value: '371',
    code: 'LV',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Latvia.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Turkey',
    dial_code: '+90',
    value: '90',
    code: 'TR',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg',
    inputMask: '999 999 99 99',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Portugal',
    dial_code: '+351',
    value: '351',
    code: 'PT',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Indonesia',
    dial_code: '+62',
    value: '62',
    code: 'ID',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Czech Republic',
    dial_code: '+420',
    value: '420',
    code: 'CZ',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Malta',
    dial_code: '+356',
    value: '356',
    code: 'MT',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Malta.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Madagascar',
    dial_code: '+261',
    value: '261',
    code: 'MG',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Madagascar.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Thailand',
    dial_code: '+66',
    value: '66',
    code: 'TH',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Peru',
    dial_code: '+51',
    value: '51',
    code: 'PE',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Nicaragua',
    dial_code: '+505',
    value: '505',
    code: 'NI',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Nicaragua.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Chile',
    dial_code: '+56',
    value: '56',
    code: 'CL',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Finland',
    dial_code: '+358',
    value: '358',
    code: 'FI',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg',
    inputMask: '99 999 99 99',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Jamaica',
    dial_code: '+1876',
    value: '1876',
    code: 'JM',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Jamaica.svg',
    inputMask: '',
    maxLength: '11',
    minLength: '7'
  },
  {
    text: 'Slovakia',
    dial_code: '+421',
    value: '421',
    code: 'SK',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Slovakia.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Norway',
    dial_code: '+47',
    value: '47',
    code: 'NO',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg',
    inputMask: '999 99 999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Brazil',
    dial_code: '+55',
    value: '55',
    code: 'BR',
    flag: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg',
    inputMask: '(99) 999999999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Panama',
    dial_code: '+507',
    value: '507',
    code: 'PA',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Flag_of_Panama.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Poland',
    dial_code: '+48',
    value: '48',
    code: 'PL',
    flag: 'https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg',
    inputMask: '999-999-999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Australia',
    dial_code: '+61',
    value: '61',
    code: 'AU',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg',
    inputMask: '(99) 9999 9999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Taiwan',
    dial_code: '+886',
    value: '886',
    code: 'TW',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Bangladesh',
    dial_code: '+880',
    value: '880',
    code: 'BD',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Ecuador',
    dial_code: '+593',
    value: '593',
    code: 'EC',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Egypt',
    dial_code: '+20',
    value: '20',
    code: 'EG',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Austria',
    dial_code: '+43',
    value: '43',
    code: 'AT',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Hong Kong',
    dial_code: '+852',
    value: '852',
    code: 'HK',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Hong_Kong.svg',
    inputMask: '9999 9999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Germany',
    dial_code: '+49',
    value: '49',
    code: 'DE',
    flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
    inputMask: '9999 99999999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Colombia',
    dial_code: '+57',
    value: '57',
    code: 'CO',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg',
    inputMask: '999 999 9999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Lebanon',
    dial_code: '+961',
    value: '961',
    code: 'LB',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Greece',
    dial_code: '+30',
    value: '30',
    code: 'GR',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Argentina',
    dial_code: '+54',
    value: '54',
    code: 'AR',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg',
    inputMask: '(99) 99999999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Mauritius',
    dial_code: '+230',
    value: '230',
    code: 'MU',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Mauritius.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Estonia',
    dial_code: '+372',
    value: '372',
    code: 'EE',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg',
    inputMask: '9999 999999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Philippines',
    dial_code: '+63',
    value: '63',
    code: 'PH',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg',
    inputMask: '9999 9999999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Hungary',
    dial_code: '+36',
    value: '36',
    code: 'HU',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg',
    inputMask: '',
    maxLength: '13',
    minLength: '7'
  },
  {
    text: 'Ukraine',
    dial_code: '+380',
    value: '380',
    code: 'UA',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg',
    inputMask: '(99) 999 99 99',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Belgium',
    dial_code: '+32',
    value: '32',
    code: 'BE',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg',
    inputMask: '999 99 99 99',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Netherlands',
    dial_code: '+31',
    value: '31',
    code: 'NL',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg',
    inputMask: '99 99999999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Pakistan',
    dial_code: '+92',
    value: '92',
    code: 'PK',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg',
    inputMask: '999-9999999',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Morocco',
    dial_code: '+212',
    value: '212',
    code: 'MA',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Nepal',
    dial_code: '+977',
    value: '977',
    code: 'NP',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'Tunisia',
    dial_code: '+216',
    value: '216',
    code: 'TN',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg',
    inputMask: '',
    maxLength: '12',
    minLength: '7'
  },
  {
    text: 'New Zealand',
    dial_code: '+64',
    value: '64',
    code: 'NZ',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg',
    inputMask: '999-999-9999',
    maxLength: '10',
    minLength: '7'
  }
].sort(sortObjectArray)

export const preferredCountriesForPhoneInput = [
  'DZ', 'AD', 'AR', 'AU', 'AT', 'BH', 'BD', 'BE', 'BA', 'BR', 'CA', 'CL', 'CN', 'CO', 'HR', 'CZ', 'DK', 'EC', 'EG', 'EE', 'FI', 'FR', 'PF', 'DE', 'GR', 'HK', 'HU', 'IN', 'ID', 'IR', 'IE', 'IL', 'IT', 'JM', 'JP', 'JO', 'LV', 'LB', 'LTU', 'LT', 'LU', 'MG', 'MY', 'MT', 'MU', 'MX', 'MA', 'NP', 'NL', 'NZ', 'NI', 'NG', 'NO', 'PK', 'PA', 'PY', 'PE', 'PH', 'PL', 'PT', 'QA', 'RO', 'RU', 'SG', 'SK', 'SI', 'ZA', 'ES', 'LK', 'SE', 'CH', 'TW', 'TH', 'TN', 'TR', 'UA', 'AE', 'GB', 'US', 'UY', 'VE', 'VN'
]

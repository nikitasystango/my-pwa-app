import { createIntl } from 'react-intl';
import messagesEn from '../translations/translatedMessage.json';
const messages = {
  en: messagesEn
}
const language = navigator.language.split(/[-_]/)[0];
const intl = createIntl({ locale: language, messages: messages[language] })
const IntlMessage = (message, value) => {
  if (value) {
    return intl.formatMessage(message, { data: value })
  } else {
    return intl.formatMessage(message)
  }
}

export default IntlMessage

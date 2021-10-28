/* eslint-disable */
import { isEmpty as isEmptyObject, isNull, each } from "lodash";
import moment from "moment";
import intl from 'utils/intlMessage'
import validationMessages from 'constants/messages/validationMessages'
import { disposalEmails } from 'constants/globalConstants'

export const isEmpty = value => value === undefined || isNull(value) || value === "";

export const join = rules => (value, data, validationMessage) =>
  rules
    .map(rule => rule(value, data, validationMessage))
    .filter(error => !!error)[0 /* first error */];

export function email(value) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const emailAddress = value.toLowerCase()
  const emailExist = disposalEmails.filter(data => emailAddress.includes(data))
  if (!isEmpty(value) && !(regex.test(value) && !emailExist.length)) {
    return intl(validationMessages.invalidEmailAddress);
  }
}

export function link(value) {
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
  if (!isEmpty(value) && !regex.test(value)) {
    return intl(validationMessages.invalidLink);
  }
}

export function required(value, state, validationMessage) {
  const type = typeof value;
  const restrictedTrimType = ["number", "boolean"];
  if (isEmpty(value)) {
    return intl(validationMessages.required);
  }
  if (restrictedTrimType.indexOf(type) === -1 && value && JSON.stringify(value).trim().length === 0) {
    return intl(validationMessages.required);
  }
}

export function onlyPast(value) {
  if (!isNull(value) && moment(value).isValid() && moment().isBefore(value)) {
    return intl(validationMessages.cannotSelectFutureDate);
  }
}

export function fileSize(maxSize) {
  return value => {
    const largerFileArray = value.filter(o => o.file.size > maxSize);
    if (!isEmptyObject(largerFileArray)) {
      return `${intl(validationMessages.maximumFileSize)} ${maxSize / 1000000} mb`;
    }
  };
}

export function file(value) {
  if (isEmpty(value) || isNull(value)) {
    return intl(validationMessages.fieldRequired);
  }
}

export function url(value) {
  const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g; // eslint-disable-line no-useless-escape
  if (!regex.test(value)) {
    return intl(validationMessages.invalidUrl);
  }
}

export function nospace(value) {
  const trimmedValue = value.trim();

  if (trimmedValue.indexOf(" ") !== -1) {
    return intl(validationMessages.spaceNotAllowed);
  }

  if (trimmedValue.indexOf("#") !== -1) {
    return intl(validationMessages.spaceCharsNotAllowed);
  }
  if (trimmedValue.indexOf("+") !== -1) {
    return intl(validationMessages.spaceCharsNotAllowed);
  }
}

export function booleanTrue(value) {
  const type = typeof value;
  const restrictedTrimType = ["boolean"];

  if (
    isEmpty(value) ||
    (restrictedTrimType.indexOf(type) >= 0 && value === false)
  ) {
    return intl(validationMessages.required);
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return intl(validationMessages.charactersLong , min);
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return intl(validationMessages.maxLengthReached);
    }
  };
}

export function maxArrayLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Only ${max} values are allowed`;
    }
  };
}

export function max(max) {
  return value => {
    if (!isEmpty(value) && Number(value) > max) {
      return `${intl(validationMessages.cannotBeGreaterThan)} ${max}`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return intl(validationMessages.typeInNumber)
  }
}

export function float(value) {
  if (isNaN(value - parseFloat(value))) {
    return intl(validationMessages.typeInNumber)
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(", ")}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return intl(validationMessages.passwordsDoNotMatch)
      }
    }
  };
}

export function requiredIf(field) {
  return (value, data) => {
    if (data) {
      if (isEmptyObject(data[field]) && isEmpty(value)) {
        return intl(validationMessages.atleastAFieldRequired)
      }
    }
  };
}

export function zipcode(field) {
  return (value, data) => {
    if (data) {
      const trimmedValue = value.trim();
      const validLength = data[field].length;
      if (validLength === 0) {
        return intl(validationMessages.selectLocation);
      }
      if (validLength !== trimmedValue.length) {
        return `Must be of ${validLength} characters`;
      }
    }
  };
}

export function choseAtleastOne(items) {
  const options = items.split(",");

  return (value, data) => {
    if (
      options
        .map(field => data[field])
        .filter(
          fieldValue => !isEmptyObject(fieldValue) && !isEmpty(fieldValue)
        ).length === 0
    )
      return `${intl(validationMessages.chooseOne)} ${items}`;
  };
}

export function nospecial(value) {
  const trimmedValue = value.trim();
  const regex = /^[A-Za-z0-9 ]+$/
  if (trimmedValue.indexOf(" ") !== -1) {
    return intl(validationMessages.spaceNotAllowed);
  }
  if (!isEmpty(trimmedValue) && !regex.test(trimmedValue)) {
    return intl(validationMessages.spaceCharsNotAllowed);
  }
}

export function phone(value) {
  const regex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;

  if (!isEmpty(value) && !regex.test(value)) {
    return intl(validationMessages.invalidNumber);
  }
}

export function noSpecialCharacter(str) {
  const regex = /[~`!#@$%\^&*+=\-\[\]\\';,/{}()|\\":<>\?_]/g
  if (!isEmpty(str) && regex.test(str)) {
    return intl(validationMessages.spaceCharsNotAllowed);
  }
}

export function strongPassword(str) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (regex.test(str) === false) {
    return intl(validationMessages.strongPasswordText);
  }
}


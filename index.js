'use strict'

import theText from './theText'
import theNumber from './theNumber'
import theEmail from './theEmail'
import theEnglish from './theEnglish'
import thePassword from './thePassword'
import * as errorCodes from './errorCodes'

const FRegex = function (
  opt = {
    value: '',
    type: '',
    extraSymbols: [],
    overrideConfig: {}
  }
) {
  const index = {
    'text': theText,
    'number': theNumber,
    'email': theEmail,
    'english': theEnglish,
    'password': thePassword
  }

  if (
    Object.keys(index).includes(opt.type)
  ) {
    const result = index[opt.type](
      opt.value,
      opt.extraSymbols,
      opt.overrideConfig
    )
    if (result.passed) {
      return { passed: true }
    } else {
      return result
    }
  } else {
    return {
      passed: false,
      unvalidated: [],
      removal: '',
      issues: [errorCodes.common['000']]
    }
  }
}
export default FRegex
export {}

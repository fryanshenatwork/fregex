'use strict'

import * as utils from './utils'
import * as errorCodes from './errorCodes'

// a-z, A-Z, chinese
export default function (value, extraSymbols) {
  const regex = utils.regex('^a-zA-Z0-9\u4e00-\u9fa5', extraSymbols)
  const unvalidatedMatch = value.match(regex)

  let unvalidated = []
  let passed = true
  let issues = []

  if (Array.isArray(unvalidatedMatch)) {
    issues.push(errorCodes.text['002'])
    passed = false
    unvalidatedMatch.forEach(e => {
      if (unvalidated.includes(e)) {
        return false
      } else {
        unvalidated.push(e)
      }
    })
  }

  return {
    passed,
    unvalidated,
    issues,
    removal: value.replace(regex, ''),
    msg: ''
  }
}

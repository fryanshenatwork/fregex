'use strict'

import * as utils from './utils'
import * as errorCodes from './errorCodes'

// a-z, A-Z, 0-9
export default function (value, extraSymbols) {
  const regex = utils.regex('a-zA-Z0-9', extraSymbols)

  const unvalidatedMatch = value.match(regex)

  let unvalidated = []
  let issues = []
  let passed = true

  if (Array.isArray(unvalidatedMatch)) {
    passed = false
    issues.push(errorCodes.english['002'])
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
    removal: value.replace(regex, '')
  }
}

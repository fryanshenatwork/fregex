'use strict'

import * as utils from './utils'
import * as errorCodes from './errorCodes'

// 0-9 .
const regex = utils.regex(`0-9.`, [])

export default function (value) {
  let tVal = value

  if (typeof (tVal) !== 'string') { tVal = tVal + '' }

  const unvalidatedMatch = tVal.match(regex)

  let unvalidated = []
  let issues = []
  let passed = true
  let removal = tVal.replace(regex, '')
  console.log('🚀 ~ file: theNumber.js ~ line 20 ~ removal', removal)

  if (Array.isArray(unvalidatedMatch)) {
    issues.push(errorCodes.number['002'])
    passed = false
    unvalidatedMatch.forEach(e => {
      if (unvalidated.includes(e)) {
        return false
      } else {
        unvalidated.push(e)
      }
    })
  }

  let splitRemoval = removal.split('.')
  if (splitRemoval.length <= 2) {
    // do nothing
  } else {
    passed = false
    issues.push(errorCodes.number['001'])
    removal = splitRemoval[0] + '.' + splitRemoval[1]
  }

  removal = Number(removal)

  return {
    passed,
    unvalidated,
    removal,
    issues
  }
}

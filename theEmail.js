'use strict'

import * as utils from './utils'
import * as errorCodes from './errorCodes'

// a-z, A-Z, chinese
const regex = utils.regex('a-zA-Z0-9.@+', [])
const regexFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function (value) {
  const unvalidatedMatch = value.match(regex)

  let unvalidated = []
  let issues = []
  let passed = true

  const formatMatched = regexFormat.test(value)
  if (!formatMatched) {
    passed = false
    issues.push(errorCodes.email['001'])
  }

  if (Array.isArray(unvalidatedMatch)) {
    passed = false
    issues.push(errorCodes.email['002'])
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

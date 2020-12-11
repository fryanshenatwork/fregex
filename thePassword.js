'use strict'

import * as utils from './utils'
import * as errorCodes from './errorCodes'

export default function (value, extraSymbols, overrideConfig) {
  const defaultSymbols = '!#@$%^&*)(+=._-'

  let unvalidated = []
  let issues = []
  let passed = true
  let removal = ''

  // minLength
  const checkMinLength = function () {
    let config = 8
    if (overrideConfig.minLength === false) { return true }
    if (typeof (overrideConfig.minLength) === 'number') {
      config = overrideConfig.minLength
    }
    const regex = new RegExp('^(.{' + config + ',})$', '')

    const result =  regex.test(value)
    if (!result) {
      passed = false
      issues.push(errorCodes.password['500'])
    }
  }
  checkMinLength()

  const checkRequiredNumber = function () {
    if (overrideConfig.requiredNumber === false) { return true }
    const regex = new RegExp('(?=.*[\\d])', '')

    const result =  regex.test(value)
    if (!result) {
      passed = false
      issues.push(errorCodes.password['501'])
    }
  }
  checkRequiredNumber()

  const checkRequiredUppercase = function () {
    if (overrideConfig.requiredUppercase === false) { return true }
    const regex = new RegExp('(?=.*[A-Z])', '')

    const result =  regex.test(value)
    if (!result) {
      passed = false
      issues.push(errorCodes.password['502'])
    }
  }
  checkRequiredUppercase()

  const checkRequiredLowercase = function () {
    if (overrideConfig.requiredLowercase === false) { return true }
    const regex = new RegExp('(?=.*[a-z])', '')

    const result =  regex.test(value)
    if (!result) {
      passed = false
      issues.push(errorCodes.password['503'])
    }
  }
  checkRequiredLowercase()

  const checkRequiredSymbol = function () {
    if (overrideConfig.requiredSymbol === false) { return true }
    let regexText = defaultSymbols + ''
    if (Array.isArray(extraSymbols)) {
      extraSymbols.forEach((e) => {
        if (!regexText.includes(e)) {
          regexText = '\\' + e + regexText
        }
      })
    }
    const regex = new RegExp('(?=.*[' + regexText + '])', '')

    const result =  regex.test(value)
    if (!result) {
      passed = false
      issues.push(errorCodes.password['504'])
    }
  }
  checkRequiredSymbol()

  const checkUnvalidatedWords = function () {
    let regexText = ''
    if (overrideConfig.requiredNumber !== false)  {
      regexText += '0-9'
    }
    if (overrideConfig.requiredUppercase !== false)  {
      regexText += 'A-Z'
    }
    if (overrideConfig.requiredLowercase !== false)  {
      regexText += 'a-z'
    }
    if (overrideConfig.requiredSymbol !== false)  {
      regexText += defaultSymbols
    }

    const theExtraSymbols = overrideConfig.requiredSymbol === false
      ? []
      : extraSymbols
    const regex = utils.regex(regexText, theExtraSymbols)
    const unvalidatedMatch = value.match(regex)
    if (Array.isArray(unvalidatedMatch)) {
      passed = false
      issues.push(errorCodes.password['002'])
      unvalidatedMatch.forEach(e => {
        if (unvalidated.includes(e)) {
          return false
        } else {
          unvalidated.push(e)
        }
      })
    }
  }
  checkUnvalidatedWords()

  return {
    passed,
    unvalidated,
    issues,
    removal
  }
}

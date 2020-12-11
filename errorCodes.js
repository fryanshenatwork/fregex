const defineCode = function (obj) {
  let res = {}
  Object.keys(obj).forEach((key) => {
    res[key] = obj[key]
    res[key].code = key
  })
  return res
}

const common = {
  '000': {
    'zh-tw': '未定義的Type',
    'en': 'Undefined Type'
  },
  '001': {
    'zh-tw': '格式錯誤',
    'en': 'Format is not valid'
  },
  '002': {
    'zh-tw': '包含未允許的字元',
    'en': 'Contain unvalid word'
  }
}
const text = defineCode(Object.assign({}, common, {
}))
const number = defineCode(Object.assign({}, common, {
}))
const email = defineCode(Object.assign({}, common, {
}))
const english = defineCode(Object.assign({}, common, {
}))
const password = defineCode(Object.assign({}, common, {
  '500': {
    'zh-tw': '未達最小字元長度',
    'en': 'The minimum character length is not reached'
  },
  '501': {
    'zh-tw': '請使用至少一個數字',
    'en': 'Require at least one number'
  },
  '502': {
    'zh-tw': '請使用至少一個大寫英文',
    'en': 'Require at least one capital letter'
  },
  '503': {
    'zh-tw': '請使用至少一個小寫英文',
    'en': 'Require at least one lowercase letter'
  },
  '504': {
    'zh-tw': '請使用至少一個特殊符號',
    'en': 'Require at least one symbol'
  }
}))

export {
  common,
  email,
  english,
  number,
  password,
  text
}

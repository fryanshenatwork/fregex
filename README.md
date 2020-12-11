
# Fryan-Regex
A javascript plugin to valid string format and word.

## Usage
```javascipt
import fryanRegex from 'fryan-regex'

fryanRefex({
	value: 'String',
	type: 'String',
	extraSymbols: [],
	overrideConfig: {}
})
```
## Options
1. `value` - String or number that you want to validate

2.  `type` - Validate type
	- `text`
	    ```javascript
	    fryanRefex({
			value: 'Hello Word!',
			type: 'text',
			extraSymbols: ['!']
		})
		```
	    - English(a-z, A-Z)
	    - Chinese (\u4e00-\u9fa5)
	-  `number`
	    ```javascript
	    fryanRefex({
			value: '3.1415976',
			type: 'number'
		})
		```
	    - Number(0-9) and single "."
	- `email`
		```javascript
	    fryanRefex({
			value: 'exmaple@exmaple.com',
			type: 'email'
		})
		```
	    - email format
	    - English(a-z, A-Z)
	    - Number(0-9)
	    - default accepted symbols: `.`,`@`,`+`
	-  `english`
		```javascript
	    fryanRefex({
			value: 'Hello World!',
			type: 'english',
			extraSumbols: [' ', '!']
		})
		```
	    - English(a-z, A-Z)
	- `password`
		```javascript
	    fryanRefex({
			value: 'abcABC01234!!',
			type: 'password',
			extraSumbols: [' ', '!'],
			overrideConfig:  {
				minLength:  8,
				requiredNumber:  true,
				requiredUppercase:  true,
				requiredLowercase:  true,
				requiredSymbol:  true
			}
		})
		```
		Type password won't return `removal`


3. `extraSymbols` - Extra valid symbol
You may add some symbol to validate, please use Array
    ```javascript
    ['@', '!', '&']
    ```

## Return
**Success**
```javascript
{ passed: true }
```
**Error**
```javascript
{
	issues: [
		{
			'code': '000',
			'en': 'Reason',
			'zh-tw': '原因'
		}
	],
	passed: false,
	removal: 'Hello Word !',
	unvalidated: ['/', '=']
}
```
1. issues - (Array)
Issues why not valided
You can edit in `errorCodes.js`
2. passed - (Boolean)
Is the string that valided
3. removal - (String, Number)
value that remove unvalid chraters and match format
4. unvalidated - (Array)
Words which are not valided

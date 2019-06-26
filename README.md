# react-intl-macro-json


When creating new keys for [react-intl](https://www.npmjs.com/package/react-intl) elements in your application, this package allows users to enter new key:value into CLI to write to react-intl json files and sort.

## Install
`npm install react-intl-json-macro`


### Setup
1. In your `package.json`, add a script similiar to the following:
 >`"scripts": {`
 >>`"add:intlMessage": "node node_modules/react-intl-json-macro [JSON file directory location]"`
 
 >`}`
  * For example: `"add:intlMessage": "node node_modules/react-intl-json-macro './i18n/locales'"`
  

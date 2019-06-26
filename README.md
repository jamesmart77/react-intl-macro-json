# react-intl-macro-json

### [npm package](https://www.npmjs.com/package/react-intl-json-macro)

When creating new keys for [react-intl](https://www.npmjs.com/package/react-intl) elements in your application, this package allows users to enter new key:value into CLI to write to react-intl json files and sort.

## Install
`npm install react-intl-json-macro`


### Setup
1. In your `package.json`, add a script similiar to the following:
 >`"scripts": {`
 >>`"add:intlMessage": "node node_modules/react-intl-json-macro [JSON file directory location]"`
 
 >`}`
  * For example: `"add:intlMessage": "node node_modules/react-intl-json-macro './src/i18n/locales'"`
  * Only JSON files will be selected from the defined directory
  

### Running Tool
1. `npm run add:intlMessage "KEY NAME" "MESSAGE NAME"`  
For example: `npm run add:intlMessage "header.subText" "default message text"`
2. All JSON files in the directory you have defined in the npm scripts will then be updated with the key:value pair you have executed. All keys in each JSON file will be alphabetized after the new key:value pair has been added.


### Additional Notes
  * Installing [Prettier](https://www.npmjs.com/package/prettier) will help keep the JSON files formatted nicely
  * Install: `npm install --save-dev prettier
  * Update npm scripts for prettier
  >`"scripts": {`
  >>`"pretty:json": "prettier --write './src/i18n/locales/*.json'"`
 
  >`}`
  * Run scripts together now  
  `npm run add:intlMessage "header.subText" "default message text" && npm run pretty:json`

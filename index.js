const fs = require('fs');
const jsonFileDir = './src/i18n/locales';

const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

const newKey = process.argv[2];
const newValue = process.argv[3];

let files = fs.readdirSync(jsonFileDir);
let jsonFiles = files.filter(file => file.includes('.json'));

let newObjToAdd = {
    [newKey]: newValue
};

//start processing all JSON files in directory
jsonFiles.forEach(fileName => {
    isNewKeyUnique(fileName, newKey);
});

async function isNewKeyUnique(fileName, newKey){
    let responseObject = await parseFileData(fileName);
    let existingKeys = Object.keys(responseObject);

    let isUnique = existingKeys.every(key => key !== newKey);

    if(isUnique){
        updateFile(fileName);
    } else {
        console.log("key already exists in: ", fileName);
    }
}

async function updateFile(fileName){
    let data = await parseFileData(fileName);

    //add new key/value pair to file
    let updatedObj = Object.assign(newObjToAdd, data);

    //sort updated object
    const ordered = {};
    Object.keys(updatedObj).sort().forEach(function(key) {
        ordered[key] = updatedObj[key];
    });

    let json = JSON.stringify(ordered); //convert it back to json
    let filePath = jsonFileDir + "/" + fileName;

    fs.writeFile(filePath, json, 'utf8', function(err) { // write it back
        if (err) throw err;
        console.log(`Saved ${newObjToAdd} in ${fileName}`);
    });
}

async function parseFileData(fileName){
    try {
        let filePath = jsonFileDir + "/" + fileName;
        const res = await readFileAsync(filePath);
        return JSON.parse(res); //return parsed file data
    } catch (error) {
        console.error("Issue adding new key: ", error);
    }
}
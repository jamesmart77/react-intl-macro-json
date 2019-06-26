const fs = require('fs');
const jsonFileDir = process.argv[2];

const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

console.log("Defined JSON Directory: ", jsonFileDir);

const newKey = process.argv[3];
const newValue = process.argv[4];

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
    let isDuplicate = responseObject.hasOwnProperty(newKey);

    if(!isDuplicate){
        updateFile(fileName, responseObject);
    } else {
        console.log("key already exists in:", fileName);
    }
}

async function updateFile(fileName, data){
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
        console.log(`Saved ${newKey}:${newValue} in ${fileName}`);
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
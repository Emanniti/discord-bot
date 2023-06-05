const fs = require('fs');
const path = require('path');

module.exports = (directory, foldersOnly = false) => {
    let filenames = [];

    const files = fs.readdirSync(directory, { withFileTypes: true });

    files.forEach(element => {
        const filePath = path.join(directory, element.name);

        if (foldersOnly) {
            if (element.isDirectory()) {
                filenames.push(filePath)
            }
        } else {
            if(element.isFile()){
                filenames.push(filePath)
            }
        }
    });

    return filenames;
}
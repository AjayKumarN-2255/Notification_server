const path = require('path');
const fs = require('fs');


function loadTemplate(templateName) {
    const templatePath = path.join(__dirname, 'mail', templateName);
    return fs.readFileSync(templatePath, 'utf8')
}
module.exports = {
    loadTemplate,
}
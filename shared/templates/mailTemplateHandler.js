const path = require('path');
const fs = require('fs');


function loadMailTemplate(templateName) {
    const templatePath = path.join(__dirname, 'mail', templateName);
    return fs.readFileSync(templatePath, 'utf8');
}

function loadMsgTemplate(templateName) {
    const templatePath = path.join(__dirname, 'message', templateName);
    return fs.readFileSync(templatePath, 'utf8');
}


module.exports = {
    loadMailTemplate,
    loadMsgTemplate
}
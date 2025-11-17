
async function sendMail(mailTemp, email, ind) {
    if ([2, 8, 1, 9, 5].includes(ind)) {
        console.log(`send mail to ${email} failed`);
        throw new Error(`Failed to send mail to ${email} at index ${ind}`);
    }


    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`send mail to ${email} successfuly`);
    return true; // success
}
module.exports = {
    sendMail
}
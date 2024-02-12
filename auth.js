const { log } = require('console');
const fs = require('fs');

 function authenticateUser(accountID, pin) {
    const users = JSON.parse(fs.readFileSync("./users.json"));
    const user = users.find(u => u.accountID === accountID && u.pin === pin);
    return user;
    
    
}
// console.log(authenticateUser("ACC1003", "1163"));

module.exports = {authenticateUser};

// const { log } = require('console');
const fs = require('fs');
// const readline = require('readline');
// const Auth = require('./Auth');
// const Main = require('./main');


 function generatePinId() {

    let genPin = Math.floor(1000 + Math.random() * 9000).toString();

    const users = JSON.parse(fs.readFileSync('./users.json'));
    const lastUser = users[users.length - 1];
    let genId;
    if (!lastUser) {
        genId = 'ACC1001';
    } else {
        const lastAccountId = parseInt(lastUser.accountID.substring(3));
        genId = `ACC${lastAccountId + 1}`;

    }
    return { genPin, genId };
}
// console.log(generatePinId());

 function addUser(name) {
    const users = JSON.parse(fs.readFileSync("./users.json"));
    const newUser = {
        accountID: generatePinId().genId,
        name: name,
        pin: generatePinId().genPin,
        balance: 0,
        transactions: []
    };
    users.push(newUser);
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
    console.log('User added successfully:', newUser);
    

};
module.exports = {
    generatePinId,
    addUser
};
const { log } = require('console');
const fs = require('fs');

function checkBalance(user) {
    console.log(`Your current balance is: ${user.balance}`);
}


function depositMoney(user, amount) {
    amount = parseFloat(amount);
    if (isNaN(amount) || amount <= 0) {
        console.log('Invalid amount. Please enter a valid amount.');
    } else {
        user.balance += amount;
        user.transactions.push({ type: 'deposit', amount: amount, date: new Date().toISOString() });
        updateUser(user);
        console.log(`Deposit of ${amount} successfully made.`);
    }
}

function withdrawMoney(user, amount) {
    amount = parseFloat(amount);
    if (isNaN(amount) || amount <= 0) {
        console.log('Invalid amount. Please enter a valid amount.');
    } else if (amount > user.balance) {
        console.log('Insufficient funds. You cannot withdraw more than your current balance.');
    } else {
        user.balance -= amount;
        user.transactions.push({ type: 'withdraw', amount: amount, date: new Date().toISOString() });
        updateUser(user);
        console.log(`Withdrawal of ${amount} successfully made.`);
    }
}

function viewTransactionHistory(user) {
    console.log('Transaction History:');
    user.transactions.forEach(transaction => {
        const formattedDate = new Date(transaction.date).toISOString().slice(0, 19).replace("T", " ");
        console.log(`${transaction.type} of ${transaction.amount} on ${formattedDate}`);
    });
}

function updateUser(user) {
    const users = JSON.parse(fs.readFileSync("./users.json"));
    const index = users.findIndex(u => u.accountID === user.accountID);
    if (index !== -1) {
        users[index] = user;
        fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
    }
}

module.exports = { checkBalance, depositMoney, withdrawMoney, viewTransactionHistory };
const { log } = require('console');
const fs = require('fs');
const readline = require('readline');
const { authenticateUser } = require('./auth');
const { addUser } = require('./Sign');
const { checkBalance, depositMoney, withdrawMoney, viewTransactionHistory } = require('./atmOpp');



rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function initialMenu() {
    console.log('\n Choose an action:');
    console.log('1. Add a user');
    console.log('2. Authentification');
    console.log('3. Exit');

    rl.question('Enter the number of your choice: ', (menu) => {
        switch (menu) {
            case '1':
                rl.question('Enter your name: ', (name) => {
                    addUser(name);
                    initialMenu();
                });

                break;
            case '2':

                authenticate();
                break;
            case '3':
                console.log("Exiting the application. Goodbye!");
                rl.close();
                break;

            default:
                console.log("Invalid choice. Please try again.");
                initialMenu();
                break;
        }
    });

}
function authenticate() {
    rl.question('Enter your accountID: ', (accountID) => {
        rl.question('Enter your PIN: ', (pin) => {
            const user = authenticateUser(accountID, pin);
            if (user) {
                console.log('Authentication successful. Welcome,', user.name);
                bankingMenu(user);
            } else {
                console.log('Authentication failed. Invalid accountID or PIN.');
                initialMenu();
            }
        });
    });
}

function bankingMenu(user) {
    console.log('\n Choose an action:');
    console.log('1. Check Balance');
    console.log('2. Deposit Money');
    console.log('3. Withdraw Money');
    console.log('4. View Transaction History');
    console.log('5. Exit');

    rl.question('Enter the number of your choice: ', (menu) => {
        switch (menu) {
            case '1':
                checkBalance(user);
                bankingMenu(user);
                break;
            case '2':
                rl.question('Enter amount to deposit: ', (amount) => {
                    depositMoney(user, amount);
                    bankingMenu(user);
                });
                break;
            case '3':
                rl.question('Enter amount to withdraw: ', (amount) => {
                    withdrawMoney(user, amount);
                    bankingMenu(user);
                });
                break;
            case '4':
                viewTransactionHistory(user);
                bankingMenu(user);
                break;
            case '5':
                console.log("Exiting the application. Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please try again.");
                bankingMenu(user);
                break;
        }
    });
}

initialMenu();


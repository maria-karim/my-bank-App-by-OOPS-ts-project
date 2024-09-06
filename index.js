#! /usr/bin/env node
import inquirer from 'inquirer';
class BankAccount {
    accountNumber;
    owner;
    balance;
    constructor(accountNumber, owner, initialBalance = 0) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.balance = initialBalance;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited $${amount}. New balance: $${this.balance}.`);
        }
        else {
            console.log("Deposit amount must be positive.");
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew $${amount}. New balance: $${this.balance}.`);
        }
        else {
            console.log("Invalid amount. Either the withdrawal amount exceeds your balance or it's negative.");
        }
    }
    checkBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
    getAccountDetails() {
        console.log(`Account Owner: ${this.owner}`);
        console.log(`Account Number: ${this.accountNumber}`);
        console.log(`Balance: $${this.balance}`);
    }
}
async function createAccount() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'owner',
            message: 'Enter account owner name:',
        },
        {
            type: 'input',
            name: 'accountNumber',
            message: 'Enter account number:',
        },
        {
            type: 'input',
            name: 'initialBalance',
            message: 'Enter initial deposit amount (optional):',
            default: 0,
            validate: (input) => {
                const person = parseFloat(input);
                return !isNaN(person) && person >= 0 ? true : 'Please enter a valid amount.';
            },
        },
    ]);
    return new BankAccount(answers.accountNumber, answers.owner, parseFloat(answers.initialBalance));
}
async function manageAccount(account) {
    let continueManaging = true;
    while (continueManaging) {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Deposit', 'Withdraw', 'Check Balance', 'Account Details', 'Exit'],
            },
        ]);
        switch (answer.action) {
            case 'Deposit':
                const depositAmount = await inquirer.prompt({
                    type: 'input',
                    name: 'amount',
                    message: 'Enter amount to deposit:',
                    validate: (input) => {
                        const person = parseFloat(input);
                        return !isNaN(person) && person > 0 ? true : 'Please enter a valid deposit amount.';
                    },
                });
                account.deposit(parseFloat(depositAmount.amount));
                break;
            case 'Withdraw':
                const withdrawAmount = await inquirer.prompt({
                    type: 'input',
                    name: 'amount',
                    message: 'Enter amount to withdraw:',
                    validate: (input) => {
                        const person = parseFloat(input);
                        return !isNaN(person) && person > 0 ? true : 'Please enter a valid withdrawal amount.';
                    },
                });
                account.withdraw(parseFloat(withdrawAmount.amount));
                break;
            case 'Check Balance':
                account.checkBalance();
                break;
            case 'Account Details':
                account.getAccountDetails();
                break;
            case 'Exit':
                continueManaging = false;
                console.log("Exiting account management program.");
                console.log("\n Thankyou for using Our HBL bank services, Have a great day!");
                console.log("\n################################.....####################################");
                break;
        }
    }
}
async function runBankApplication() {
    const account = await createAccount();
    await manageAccount(account);
}
runBankApplication();

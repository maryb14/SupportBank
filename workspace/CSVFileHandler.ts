import {FileHandler} from './interfaceFileHandler'
import {Account} from './account'
import {Transaction} from './transaction'

const fs = require('fs')

export class CSVFileHandler extends FileHandler {
    private inputString: string;
    public nameToUser = {};
    
    private addAccount(name: string) {
        if(this.nameToUser[name] == undefined) {
            this.nameToUser[name] = new Account(name);
        }
    }

    private createAccounts() {
        var inputEntries = this.inputString.split('\n');
        for(var i = 1; i < inputEntries.length - 1; i += 1){
            var inputArray = inputEntries[i].split(',');
            this.addAccount(inputArray[2]);
            this.addAccount(inputArray[1]);
        }
    }

    private handleTransactions() {
        var inputEntries = this.inputString.split('\n');
        for(var i = 1; i < inputEntries.length - 1; i += 1){
            var inputArray = inputEntries[i].split(',');
            var date = inputArray[0];
            var fromUser = inputArray[1];
            var toUser = inputArray[2];
            var narrative = inputArray[3];
            var amount = Number(inputArray[4]);
            var t = new Transaction(date, this.nameToUser[fromUser], this.nameToUser[toUser], narrative, amount);
        }
    }
    constructor(fileName: string) {
        super(fileName);
        this.inputString = fs.readFileSync(fileName, 'utf8');
        this.createAccounts();
        this.handleTransactions();
    }
}
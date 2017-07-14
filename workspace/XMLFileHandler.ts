import {FileHandler} from './interfaceFileHandler'
import {Account} from './account'
import {Transaction} from './transaction'

const fs = require('fs');
const log4js = require('log4js');
const logger = log4js.getLogger();
const axios = require('axios');
//const xml2json = require('xml2json')

export class XMLFileHandler extends FileHandler{
    public nameToUser = {};
    private transactionArray; 
    private addAccount(name: string){
        if(this.nameToUser[name] == undefined) {
            this.nameToUser[name] = new Account(name);
        }
    }

    private createAccounts() {
        this.transactionArray.forEach(item => {
            this.addAccount(item.FromAccount);
            this.addAccount(item.ToAccount);
        });
    }

    private handleTransactions() {
        this.transactionArray.forEach(item => {
            var t = new Transaction(item.Date, this.nameToUser[item.FromAccount], this.nameToUser[item.ToAccount], item.Narrative, item.Amount);
        });
    }
    constructor(fileName: string) {
        super(fileName);
        
        //this.createAccounts();
        //this.handleTransactions();
    }
}


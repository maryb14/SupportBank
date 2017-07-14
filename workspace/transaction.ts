import {Account} from './account'
const log4js = require('log4js');
const logger = log4js.getLogger();

export class Transaction {
    
    constructor(public date: string, public fromUser: Account, public toUser: Account, public narrative: string, public value: number) { 
        fromUser.addTransaction(this);
        toUser.addTransaction(this);
    };
}
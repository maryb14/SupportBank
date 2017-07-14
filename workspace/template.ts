import {Account} from './account'
import {Transaction} from './transaction'
import {CSVFileHandler} from './CSVFileHandler'
import {JSONFileHandler} from './JSONFileHandler'
import {FileHandler} from './interfaceFileHandler'
import {XMLFileHandler} from './XMLFileHandler'

const fs = require('fs');
const readline = require('readline');
const log4js = require('log4js');
const logger = log4js.getLogger();

log4js.configure({
    appenders: { 
        sth2: { type: 'file', filename: 'logs/debug.log' },
        sth1: { type: 'console'}
    },
    categories: {default: { appenders: ['sth2'], level: 'debug'} }
});

export class Template {

    public handler: FileHandler;

    private handleListCommand() {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let promiseInputListCommand: Promise<string> = new Promise((resolve) => { 
            rl.question("Input a command\n", function(data) {
                resolve(data.toString());
                rl.close();
            });
        });
        promiseInputListCommand.then((inputCommand: string) => {
            if(inputCommand == "List All"){                
                for(var name in this.handler.nameToUser){
                    console.log("User " + this.handler.nameToUser[name].name + " owes " + (-1) * this.handler.nameToUser[name].heOwes +
                        " and is owed " + this.handler.nameToUser[name].heIsOwed);
                }
            }
            else if(inputCommand.substring(0, 5) == "List ") {
                var userName: string = inputCommand.substring(5, inputCommand.length);
                if(this.handler.nameToUser[userName] == undefined) {
                    console.log("User with name " + userName + " does not exist!");
                }
                else {
                    this.handler.nameToUser[userName].displayTransactions();
                }
            }
            else {
                console.log("Command not valid!");
            }
        })
    }

    private handleUserInput(){
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let promiseInputFile: Promise<string> = new Promise((resolve) => { 
            rl.question("Input a command\n", function(data) {
                resolve(data.toString());
                rl.close();
            });
        });
        promiseInputFile.then((inputCommand: string) => {
            if(inputCommand.substring(0, 12) == "Import File "){
                var fileName: string = inputCommand.substring(12, inputCommand.length);
                if(inputCommand.substring(inputCommand.length - 4, inputCommand.length) == ".csv"){
                    this.handler = new CSVFileHandler(fileName);
                }
                else if(inputCommand.substring(inputCommand.length - 5, inputCommand.length) == ".json"){
                    this.handler = new JSONFileHandler(fileName);
                }
                else if(inputCommand.substring(inputCommand.length - 4, inputCommand.length) == ".xml"){
                    this.handler = new XMLFileHandler(fileName);
                }
                else {
                    console.log("Invalid type of file!");
                }
                if(this.handler != undefined){
                     this.handleListCommand();
                }
            }
            else {
                console.log("Command not valid!");
            }
        })
    }

    public run(): void {
        this.handleUserInput();
        //this.handler = new XMLFileHandler("Transactions2012.xml");
    }
}


import {Transaction} from './transaction'

export class Account {
    public name: string;
    private listOfTransactions: {otherUser: Account, value: number, date: string, narrative: string}[];
    public heIsOwed: number;
    public heOwes: number;

    constructor(someName: string){
        this.name = someName;
        this.heIsOwed = 0;
        this.heOwes = 0;
        this.listOfTransactions = [];
    }

    public addTransaction(t: Transaction){
        if(t.toUser.name == this.name){
            this.listOfTransactions.push({otherUser: t.fromUser, value: t.value, date: t.date, narrative: t.narrative});
            this.heIsOwed += t.value;
        }
        else {
            this.listOfTransactions.push({otherUser: t.toUser, value: t.value, date: t.date, narrative: t.narrative});
            this.heOwes -= t.value;
        }
    }

    public displayTransactions(){
        this.listOfTransactions.forEach((item) => console.log("Other user: " + item.otherUser.name
         + " Date: " + item.date + " Amount: " + item.value + " Narrative: " + item.narrative));
    }
}
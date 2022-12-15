export class SentLetter {
    dateSent!: Date; 
    referenceNumber!: string; 
    recepient!: string; 
    subject!: string;
}

export class ReceivedLetter {
    dateReceived!: Date; 
    referenceNumber!: string; 
    sender!: string; 
    subject!: string;
}

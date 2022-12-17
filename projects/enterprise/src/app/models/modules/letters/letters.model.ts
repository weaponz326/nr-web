export class SentLetter {
    account!: string;
    date_sent!: Date; 
    reference_number!: string; 
    recepient!: string; 
    subject!: string;
}

export class ReceivedLetter {
    account!: string;
    date_received!: Date; 
    reference_number!: string; 
    sender!: string; 
    subject!: string;
}

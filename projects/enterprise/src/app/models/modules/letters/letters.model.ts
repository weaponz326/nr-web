export class SentLetter {
    date_sent!: Date; 
    reference_number!: string; 
    recepient!: string; 
    subject!: string;
}

export class ReceivedLetter {
    date_received!: Date; 
    reference_number!: string; 
    sender!: string; 
    subject!: string;
}

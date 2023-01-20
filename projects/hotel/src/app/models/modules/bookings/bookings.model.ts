export class Booking {
    account!: string;
    guest!: string;
    booking_code!: string;
    booking_date!: Date;
    expected_arrival!: Date;
    booking_status!: string;
}

export class BookedRoom {
    booking!: string;
    room!: string;
    persons_number!: number;
}
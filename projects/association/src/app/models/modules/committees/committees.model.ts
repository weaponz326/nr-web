export class Committee {
    account!: string;
    committee_name!: string;
    description!: string;
    date_commissioned!: Date;
    date_decommissioned!: Date;
    committee_chairman!: string;
}

export class CommitteeMember {
    committee!: string;
    member!: string;
}
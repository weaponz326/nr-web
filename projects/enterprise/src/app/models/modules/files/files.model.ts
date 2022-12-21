export class Folder {
    account!: string;
    folder_number!: string;
    folder_name!: string;
}

export class File {
    folder!: string;
    file_number!: string;
    file_name!: string;
    file_type!: string;
    date_added!: Date;
}

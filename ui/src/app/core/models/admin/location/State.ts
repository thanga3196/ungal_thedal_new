export class State {
    id: number = 0;
    countryId!: number;
    nme!: string;
    active!: boolean;
    dateCreated: Date = new Date();
    lastUpdated: Date = new Date();
}
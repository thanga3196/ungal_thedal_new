export class District {
    id: number = 0;
    stateId!: number;
    nme!: string;
    active!: boolean;
    dateCreated: Date = new Date();
    lastUpdated: Date = new Date();
}
export class Region {
    id: number = 0;
    nme!: string;
    active!: boolean;
    dateCreated: Date = new Date();
    lastUpdated: Date = new Date();
}
export class City {
    id: number = 0;
    districtId!: number;
    nme!: string;
    active!: boolean;
    dateCreated: Date = new Date();
    lastUpdated: Date = new Date();
}

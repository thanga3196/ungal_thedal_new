export class Country {
    id: number = 0;
    regionId!: number;
    nme!: string;
    cde!: string;
    mobileCde!: string;
    mobileRegex!: string;
    active!: boolean;
    dateCreated: Date = new Date();
    lastUpdated: Date = new Date();
}

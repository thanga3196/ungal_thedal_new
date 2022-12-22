export class SubCategory {
    id: number = 0;
    nme!: string;
    categoryId!: number;
    active!: boolean;
    logo!: string;
    logoPath!: string;
    dateCreated: Date = new Date();
    lastUpdated: Date = new Date();
}
export class SubCategory {
    id: number = 0;
    nme!: string;
    categoryId!: number;
    active!: boolean;
    dateCreated: Date = new Date();
    lastUpdated: Date = new Date();
}
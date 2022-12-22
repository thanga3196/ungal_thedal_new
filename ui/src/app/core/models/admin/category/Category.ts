export class Category {
  id: number = 0;
  nme!: string;
  active!: boolean;
  logo!: string;
  logoPath!: string;
  subCategoryCount!: number;
  dateCreated: Date = new Date();
  lastUpdated: Date = new Date();
}

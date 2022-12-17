export class Category {
  id: number = 0;
  nme!: string;
  active!: boolean;
  logo!: string;
  dateCreated: Date = new Date();
  lastUpdated: Date = new Date();
}

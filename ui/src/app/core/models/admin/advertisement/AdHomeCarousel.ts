export class AdHomeCarousel {
  id: number = 0;
  nme!: string;
  businessId: number = 0;
  pathNme!: string;
  active!: boolean;
  startDte!: Date;
  endDte!: Date;
  dateCreated: Date = new Date();
  lastUpdated: Date = new Date();
}

export class Icon {
  nme!: string;
  path!: string;
  active!: boolean;

  constructor(nme: string, path: string, active: boolean) {
    this.nme = nme;
    this.path = path;
    this.active = active;
  }
}

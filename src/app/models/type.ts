export class Type {
  public id: string;
  public name: string;

  constructor(type: any) {
    this.id = type.id || '';
    this.name = type.name || '';
  }

  public clearFields() {
    this.id = '';
    this.name = '';
  }
}

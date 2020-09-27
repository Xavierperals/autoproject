
export class City {

  public id: string;
  public name: string;

  public constructor(city: City) {
    this.id = city.id;
    this.name = city.name;
  }
}

import { City } from "./City";

export class Region {

  public id: string;
  public name: string;
  public cities: City[];

  public constructor(region: Region) {
    this.id = region.id;
    this.name = region.name;
    this.cities = region.cities;
  }

}

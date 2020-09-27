import axios from 'axios';
import { Region } from '../entities/Region';
import { ApiResponse } from './ApiResponse';
import { City } from '../entities/City';

export class ApiClient {

  public async requestRegions(): Promise<Region[]> {
    const response = await axios.get<ApiResponse>('https://api.idescat.cat/emex/v1/nodes.json?lang=es');

    return response.data.fitxes.v.v.map(regionResponse => new Region({
      id: regionResponse.id,
      name: regionResponse.content,
      cities: regionResponse.v.map(cityResponse => new City({
        id: cityResponse.id,
        name: cityResponse.content,
      })),
    }));
  }
}

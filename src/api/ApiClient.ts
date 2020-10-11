import axios, { AxiosResponse } from 'axios';
import { Region } from '../entities/Region';
import { RegionApiResponse } from './RegionApiResponse';
import { City } from '../entities/City';
import { SubmitResponse } from './SubmitResponse';
import { SubmitRequest } from './SubmitRequest';

export class ApiClient {

  public async requestRegions(): Promise<Region[]> {
    const response = await axios.get<RegionApiResponse>('https://api.idescat.cat/emex/v1/nodes.json?lang=es');

    return response.data.fitxes.v.v.map(regionResponse => new Region({
      id: regionResponse.id,
      name: regionResponse.content,
      cities: regionResponse.v.map(cityResponse => new City({
        id: cityResponse.id,
        name: cityResponse.content,
      })),
    }));
  }

  public async submitForm(request: SubmitRequest): Promise<SubmitResponse> {

    const formData = new FormData();
    // @ts-ignore
    Object.keys(request).forEach(requestKey => formData.append(requestKey, request[requestKey]));

    const response: AxiosResponse<SubmitResponse> = await axios.post(
      'http://localhost:8080/api/v1/autoproject-form-contact',
      formData,
    );

    return response.data;
  }
}

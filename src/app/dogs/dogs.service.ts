import { Injectable } from '@angular/core';


import {HttpClient} from "@angular/common/http";
import {DogsResponse} from "./dogs-response.interface";


@Injectable({
  providedIn: 'root',
})
export class DogsService {
  constructor(private readonly http: HttpClient) {
  }

  getDogs() {
    const dogsUrl = 'https://dog.ceo/api/breeds/list/all'
    return this.http.get<DogsResponse>(dogsUrl)
  }
}

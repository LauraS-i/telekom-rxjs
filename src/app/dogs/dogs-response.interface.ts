import {Breeds} from "./dogs-view/dogs.model";

export interface DogsResponse {
  message: Breeds,
  status: 'success' | 'error'
}


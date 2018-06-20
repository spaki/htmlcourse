import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  GetEndpoint(endpoint): string{
    return 'https://spakimail.azurewebsites.net/api/' + endpoint;
  }

  GetPaginationSize(): number {
    return 5;
  }
}

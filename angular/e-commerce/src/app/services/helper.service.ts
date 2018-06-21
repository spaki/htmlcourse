import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  GetEndpoint(endpoint): string{
    return 'https://spakimail.azurewebsites.net/' + endpoint;
  }

  GetQueryString(key: string, value: any): string {
    if(this.IsNullOrWhiteSpaceOrEmpty(value))
      return "";

    var result = key + "=" + encodeURIComponent(value.toString());
    return result;
  }

  ConcatQueryStrings(values: string[]): string {
    if(this.IsNullOrWhiteSpaceOrEmpty(values))
      return "";

    var result = "?";

    values.forEach(item => {
      if(!this.IsNullOrWhiteSpaceOrEmpty(item))
        result += item + "&";
    });

    result = result.substr(0, result.length - 1);

    return result;
  }

  IsNullOrWhiteSpaceOrEmpty(value: any): boolean {
    return typeof value === "undefined" || value == null || value == "" || (typeof value === "string" && value.trim() == "") || (Array.isArray(value) && value.length < 1);;
  }

  GetPaginationSize(): number {
    return 6;
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Brand } from './brand';

@Injectable()
export class BrandService {

  private brandsUrl = 'https://classlayout-2-frontend.herokuapp.com/api/brands';

  constructor(private http: Http) { }

  // get("/api/Articles")
  public getBrands(): Promise<void | Brand[]> {
    return this.http.get(this.brandsUrl)
      .toPromise()
      .then(response => response.json() as Brand[])
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}

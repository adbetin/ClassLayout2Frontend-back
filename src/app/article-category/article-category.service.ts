import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ArticleCategory } from './article-category';

@Injectable()
export class ArticleCategoryService {
  
  private articleCategoryUrl = 'https://classlayout-2-frontend.herokuapp.com/api/articlecategories';

  constructor(private http: Http) { }

  // get("/api/Articles")
  public getArticleCategories(): Promise<void | ArticleCategory[]> {
    return this.http.get(this.articleCategoryUrl)
      .toPromise()
      .then(response => response.json() as ArticleCategory[])
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}

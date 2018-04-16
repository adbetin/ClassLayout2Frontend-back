import { Injectable } from '@angular/core';
import { Article } from './article';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService {

  private ArticlesUrl = 'https://classlayout-2-frontend.herokuapp.com/api/articles';

  constructor(private http: Http) { }

  // get("/api/Articles")
  getArticles(): Promise<void | Article[]> {
    return this.http.get(this.ArticlesUrl)
      .toPromise()
      .then(response => response.json() as Article[])
      .catch(this.handleError);
  }

  // post("/api/Articles")
  createArticle(newArticle: Article): Promise<void | Article> {
    return this.http.post(this.ArticlesUrl, newArticle)
      .toPromise()
      .then(response => response.json() as Article)
      .catch(this.handleError);
  }

  // get("/api/Articles/:id") endpoint not used by Angular app

  // delete("/api/Articles/:id")
  deleteArticle(delArticleId: string): Promise<void | string> {
    return this.http.delete(this.ArticlesUrl + '/' + delArticleId)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }

  // put("/api/Articles/:id")
  updateArticle(putArticle: Article): Promise<void | Article> {
    var putUrl = this.ArticlesUrl + '/' + putArticle._id;
    return this.http.put(putUrl, putArticle)
      .toPromise()
      .then(response => response.json() as Article)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}

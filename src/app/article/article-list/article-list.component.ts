import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { Brand } from '../../brand/brand';
import { ArticleCategory } from '../../article-category/article-category';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  providers: [ArticleService]
})
export class ArticleListComponent implements OnInit {

  articles: Article[];
  selectedArticle: Article;
  displayedColumns = ['name', 'code', 'description'];

  @Output() create: EventEmitter<Article> = new EventEmitter<Article>();
  @Output() update: EventEmitter<Article> = new EventEmitter<Article>();
  @Output() delete: EventEmitter<Article> = new EventEmitter<Article>();
  @Output() select: EventEmitter<Article> = new EventEmitter<Article>();

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService
      .getArticles()
      .then((articles: Article[]) => {
        this.articles = articles.map((article) => {
          if (!article.brand) {
            article.brand = new Brand();
          }
          if (!article.articleCategory) {
            article.articleCategory = new ArticleCategory();
          }
          return article;
        });
      });
  }

  private getIndexOfArticle = (articleId: string) => {
    return this.articles.findIndex((article) => {
      return article._id === articleId;
    });
  }

  selectarticle(article: Article) {
    this.selectedArticle = article
  }

  createNewArticle() {
    var article: Article = new Article();

    // By default, a newly-created article will have the selected state.
    this.selectarticle(article);
  }

  deleteArticle = (articleId: string) => {
    var idx = this.getIndexOfArticle(articleId);
    if (idx !== -1) {
      this.articles.splice(idx, 1);
      this.selectarticle(null);
    }
    return this.articles;
  }

  addArticle = (article: Article) => {
    this.articles.push(article);
    this.selectarticle(article);
    return this.articles;
  }

  updateArticle = (article: Article) => {
    var idx = this.getIndexOfArticle(article._id);
    if (idx !== -1) {
      this.articles[idx] = article;
      this.selectarticle(article);
    }
    return this.articles;
  }

}

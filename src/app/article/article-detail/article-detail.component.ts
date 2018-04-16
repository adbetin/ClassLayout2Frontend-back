import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { ArticleCategoryService } from '../../article-category/article-category.service';
import { BrandService } from '../../brand/brand.service';
import { ArticleCategory } from '../../article-category/article-category';
import { Brand } from '../../brand/brand';

@Component({
  selector: 'article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
  providers: [ArticleService, ArticleCategoryService, BrandService]
})
export class ArticleDetailComponent implements OnInit {

  @Input()
  article: Article;

  articleCategories: ArticleCategory[];
  brands: Brand[];

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private articleService: ArticleService,
    private articleCategoryService: ArticleCategoryService,
    private brandService: BrandService) {}

  createArticle(article: Article) {
    this.articleService.createArticle(article).then((newArticle: Article) => {
      this.createHandler(newArticle);
    });
  }

  updateArticle(article: Article): void {
    this.articleService.updateArticle(article).then((updatedArticle: Article) => {
      this.updateHandler(updatedArticle);
    });
  }

  deleteArticle(articleId: string): void {
    this.articleService.deleteArticle(articleId).then((deletedArticleId: string) => {
      this.deleteHandler(deletedArticleId);
    });
  }

  ngOnInit() {
    this.articleCategoryService
    .getArticleCategories()
    .then((articleCategoryService: ArticleCategory[]) => {
      this.articleCategories = articleCategoryService.map((articleCategory) => {
        return articleCategory;
      });
    });

    this.brandService
    .getBrands()
    .then((brands: Brand[]) => {
      this.brands = brands.map((brand) => {
        return brand;
      });
    });
  }

}

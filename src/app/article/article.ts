import { ArticleCategory } from "../article-category/article-category";
import { Brand } from "../brand/brand";

export class Article {
    _id?: string;
    name: string;
    description: string;
    code: string;
    image: string;
    articleCategory: ArticleCategory;
    brand: Brand;
}
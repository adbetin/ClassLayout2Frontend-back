import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule} from '@angular/material';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleAdminComponent } from './article-admin/article-admin.component';

@NgModule({
  imports: [
    CommonModule, MatTableModule
  ],
  declarations: [ArticleListComponent, ArticleDetailComponent, ArticleFormComponent, ArticleAdminComponent], 
  exports: [ArticleListComponent, ArticleDetailComponent, ArticleFormComponent, ArticleAdminComponent]
})
export class ArticleModule { }

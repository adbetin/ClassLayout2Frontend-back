import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatInputModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, 
    MatTableModule, MatInputModule, MatFormFieldModule, MatSelectModule
  ],
  declarations: [ArticleListComponent, ArticleDetailComponent], 
  exports: [ArticleListComponent, ArticleDetailComponent]
})
export class ArticleModule { }

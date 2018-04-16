import { TestBed, inject } from '@angular/core/testing';

import { ArticleCategoryService } from './article-category.service';

describe('ArticleCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleCategoryService]
    });
  });

  it('should be created', inject([ArticleCategoryService], (service: ArticleCategoryService) => {
    expect(service).toBeTruthy();
  }));
});

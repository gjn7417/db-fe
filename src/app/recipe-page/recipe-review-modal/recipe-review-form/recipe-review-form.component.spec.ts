import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeReviewFormComponent } from './recipe-review-form.component';

describe('RecipeReviewFormComponent', () => {
  let component: RecipeReviewFormComponent;
  let fixture: ComponentFixture<RecipeReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeReviewFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

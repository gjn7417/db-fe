import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeReviewModalComponent } from './recipe-review-modal.component';

describe('RecipeReviewModalComponent', () => {
  let component: RecipeReviewModalComponent;
  let fixture: ComponentFixture<RecipeReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeReviewModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

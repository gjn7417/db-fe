import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeToolModalComponent } from './recipe-tool-modal.component';

describe('RecipeToolModalComponent', () => {
  let component: RecipeToolModalComponent;
  let fixture: ComponentFixture<RecipeToolModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeToolModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeToolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

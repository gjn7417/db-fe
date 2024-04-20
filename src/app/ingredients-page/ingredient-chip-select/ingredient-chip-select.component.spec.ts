import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientChipSelectComponent } from './ingredient-chip-select.component';

describe('IngredientChipSelectComponent', () => {
  let component: IngredientChipSelectComponent;
  let fixture: ComponentFixture<IngredientChipSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientChipSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientChipSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

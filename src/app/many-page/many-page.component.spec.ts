import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyPageComponent } from './many-page.component';

describe('ManyPageComponent', () => {
  let component: ManyPageComponent;
  let fixture: ComponentFixture<ManyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

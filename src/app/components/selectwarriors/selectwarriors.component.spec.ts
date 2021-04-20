import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectwarriorsComponent } from './selectwarriors.component';

describe('SelectwarriorsComponent', () => {
  let component: SelectwarriorsComponent;
  let fixture: ComponentFixture<SelectwarriorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectwarriorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectwarriorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

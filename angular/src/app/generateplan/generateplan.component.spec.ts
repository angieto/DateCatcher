import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateplanComponent } from './generateplan.component';

describe('GenerateplanComponent', () => {
  let component: GenerateplanComponent;
  let fixture: ComponentFixture<GenerateplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

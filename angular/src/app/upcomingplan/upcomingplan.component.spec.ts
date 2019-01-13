import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingplanComponent } from './upcomingplan.component';

describe('UpcomingplanComponent', () => {
  let component: UpcomingplanComponent;
  let fixture: ComponentFixture<UpcomingplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FindRegistrationComponent } from './registration-find.component';

describe('FindRegistrationComponent', () => {
  let component: FindRegistrationComponent;
  let fixture: ComponentFixture<FindRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

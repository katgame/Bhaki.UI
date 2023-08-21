import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ViewRegistrationComponent } from './registration-view.component';

describe('ViewRegistrationComponent', () => {
  let component: ViewRegistrationComponent;
  let fixture: ComponentFixture<ViewRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FindBranchComponent } from './branch-find.component';

describe('FindBranchComponent', () => {
  let component: FindBranchComponent;
  let fixture: ComponentFixture<FindBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

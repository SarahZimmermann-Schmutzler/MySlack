import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveNewUserComponent } from './responsive-new-user.component';

describe('ResponsiveNewUserComponent', () => {
  let component: ResponsiveNewUserComponent;
  let fixture: ComponentFixture<ResponsiveNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiveNewUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsiveNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

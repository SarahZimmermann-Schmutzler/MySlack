import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsPmResponsiveComponent } from './ws-pm-responsive.component';

describe('WsPmResponsiveComponent', () => {
  let component: WsPmResponsiveComponent;
  let fixture: ComponentFixture<WsPmResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsPmResponsiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsPmResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

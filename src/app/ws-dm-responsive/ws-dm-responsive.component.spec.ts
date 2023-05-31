import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsDmResponsiveComponent } from './ws-dm-responsive.component';

describe('WsDmResponsiveComponent', () => {
  let component: WsDmResponsiveComponent;
  let fixture: ComponentFixture<WsDmResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsDmResponsiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsDmResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

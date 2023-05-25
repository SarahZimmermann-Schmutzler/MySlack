import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsPrivateComponent } from './ws-private.component';

describe('WsPrivateComponent', () => {
  let component: WsPrivateComponent;
  let fixture: ComponentFixture<WsPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsPrivateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

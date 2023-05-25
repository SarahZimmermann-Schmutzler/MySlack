import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsDirectComponent } from './ws-direct.component';

describe('WsDirectComponent', () => {
  let component: WsDirectComponent;
  let fixture: ComponentFixture<WsDirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsDirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

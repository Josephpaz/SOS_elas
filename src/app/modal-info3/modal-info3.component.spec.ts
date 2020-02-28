import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalInfo3Component } from './modal-info3.component';

describe('ModalInfo3Component', () => {
  let component: ModalInfo3Component;
  let fixture: ComponentFixture<ModalInfo3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInfo3Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInfo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

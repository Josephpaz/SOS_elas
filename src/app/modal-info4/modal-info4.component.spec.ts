import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalInfo4Component } from './modal-info4.component';

describe('ModalInfo4Component', () => {
  let component: ModalInfo4Component;
  let fixture: ComponentFixture<ModalInfo4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInfo4Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInfo4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

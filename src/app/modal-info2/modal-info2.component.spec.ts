import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalInfo2Component } from './modal-info2.component';

describe('ModalInfo2Component', () => {
  let component: ModalInfo2Component;
  let fixture: ComponentFixture<ModalInfo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInfo2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInfo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

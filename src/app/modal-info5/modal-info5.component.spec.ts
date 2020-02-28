import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalInfo5Component } from './modal-info5.component';

describe('ModalInfo5Component', () => {
  let component: ModalInfo5Component;
  let fixture: ComponentFixture<ModalInfo5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInfo5Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInfo5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

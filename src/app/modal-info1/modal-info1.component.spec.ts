import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalInfo1Component } from './modal-info1.component';

describe('ModalInfo1Component', () => {
  let component: ModalInfo1Component;
  let fixture: ComponentFixture<ModalInfo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInfo1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInfo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

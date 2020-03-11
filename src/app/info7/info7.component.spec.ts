import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Info7Component } from './info7.component';

describe('Info7Component', () => {
  let component: Info7Component;
  let fixture: ComponentFixture<Info7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Info7Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Info7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

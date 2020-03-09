import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Info9Component } from './info9.component';

describe('Info9Component', () => {
  let component: Info9Component;
  let fixture: ComponentFixture<Info9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Info9Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Info9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

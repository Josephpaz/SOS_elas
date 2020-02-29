import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Info1Component } from './info1.component';

describe('Info1Component', () => {
  let component: Info1Component;
  let fixture: ComponentFixture<Info1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Info1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Info1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

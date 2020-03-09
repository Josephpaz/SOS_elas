import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Info8Component } from './info8.component';

describe('Info8Component', () => {
  let component: Info8Component;
  let fixture: ComponentFixture<Info8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Info8Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Info8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

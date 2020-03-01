import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuiaPage } from './guia.page';

describe('GuiaPage', () => {
  let component: GuiaPage;
  let fixture: ComponentFixture<GuiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

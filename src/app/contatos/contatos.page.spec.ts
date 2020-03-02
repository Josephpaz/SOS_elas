import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContatosPage } from './contatos.page';

describe('ContatosPage', () => {
  let component: ContatosPage;
  let fixture: ComponentFixture<ContatosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

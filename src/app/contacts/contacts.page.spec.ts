import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactsPage } from './contacts.page';

describe('ContactsPage', () => {
  let component: ContactsPage;
  let fixture: ComponentFixture<ContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

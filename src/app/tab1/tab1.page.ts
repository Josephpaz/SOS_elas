import { Component } from '@angular/core';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { ToastController, ModalController } from '@ionic/angular';
import { ModalSMSComponent } from '../modal-sms/modal-sms.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  myContacts: Contact[] = [];

  constructor(private contacts: Contacts, private callNumber: CallNumber, private sms: SMS, private toastCtrl: ToastController, private modalCtrl: ModalController) {}

  loadContacts() {

    let options = {
      filter: '',
      multiple: true,
      hasPhoneNumber: true,
    };
    
    this.contacts.find(['*'], options).then((contacts: Contact[])=> {
      this.myContacts = contacts;
      console.log('Contatos: ', contacts);
    });
  }

  sendSMS(contact: Contact) {
    this.sms.send(contact.phoneNumbers[0].value, 'Essa é minha mensagem para você');
  }

  call(contact: Contact) {
    this.callNumber.callNumber(contact.phoneNumbers[0].value, true);
  }

  createContact() {
    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, 'Militar', 'Policia');
    contact.phoneNumbers = [new ContactField('mobile', '190')];
    contact.save().then(
      async () => {
        let toast = await this.toastCtrl.create({
          message: 'Contato adicionado!'
        });
        toast.present();
      },
      (error: any) => console.error('Erro ao salvar contato', error)
    );
  }

  //******************** PARTE DO MODAL ***************/
  async showModal(){
    const modal = await this.modalCtrl.create({
      component: ModalSMSComponent
    })
    modal.present();
  }
  
}

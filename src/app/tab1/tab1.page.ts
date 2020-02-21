import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  myContacts: Contact[] = []; 

  constructor(private contacts: Contacts, private sms: SMS, private toastCtrl: ToastController) {}

  loadContacts(){
    let options = {
      filter: '',
      multiple: true,
      hasPhoneNumber: true
    };

    this.contacts.find(['*'], options).then((contacts: Contact[]) =>{
      this.myContacts = contacts;
      console.log('Contatos: ', contacts);
    });
  }

  sendSms(contact: Contact){
    this.sms.send(contact.phoneNumbers[0].value, "Esta eh minha msg para você");
  }

}

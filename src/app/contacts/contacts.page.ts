import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage{
  myContacts: Contact[] = [];
  selectedContacts: any[] = [];

  constructor(public modalController: ModalController, private contacts: Contacts, public loadingController: LoadingController) { }

  //funcao disparada no load da page
  ngOnInit() {
    this.loadContacts();//carregamento de contatos logo no load da page
    this.presentLoading();//disparando a funcao do loading 
  }

  ionViewWillEnter() {
    if (localStorage.getItem("emergencycontacts")) {
      this.selectedContacts = JSON.parse(localStorage.getItem("emergencycontacts"));
    }
  }

  numberExists(num) {
    var exists = false;
    this.selectedContacts.map(contato => {
      if (contato.numero == num)
        exists = true;
    })
    if (exists)
      return true;
    else
      return false;
  }

  //carregando os contatos
  loadContacts() {
    let options = {
      filter: '',
      multiple: true,
      hasPhoneNumber: true,
    };

    //puxando todos os contatos da agenda e armazenando-os na variavel myContacts, que é o array de contatos
    this.contacts.find(['*'], options).then((contacts: Contact[]) => {
      this.myContacts = contacts;
      console.log('Contatos: ', contacts);
    });
  }
  //pegando um contato da lista selecionado
  getContact(contact: Contact) {

    const number = contact.phoneNumbers[0].value;

    const selected = {
      nome: contact.name.givenName,
      numero: number,
    }
    if (this.selectedContacts.length < 5) {
      if (!this.numberExists(number)) {
        this.selectedContacts.push(selected);
        localStorage.setItem("emergencycontacts", JSON.stringify(this.selectedContacts))
      }
      else {
        alert("Esse contato já foi selecionado antes.");
      }
    } else {
      alert("Você só pode selecionar no máximo 5 (cinco) contatos");
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando Contatos...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  //desabiliatando a modal
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

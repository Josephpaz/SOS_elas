import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { ContactsPage } from '../contacts/contacts.page'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  
  //declarando o objeto dos contatos de emergencia
  emergencyContacts: any[] = [];
  modalDismissed: Boolean = false;
  constructor(public modalController: ModalController) { }

  ionViewWillEnter() { //quando a tela for carregada 
    if (localStorage.getItem("emergencycontacts")) { //puxando os contatos de emergencia
      this.emergencyContacts = JSON.parse(localStorage.getItem("emergencycontacts"));
    }
  }

  removeContact(number) { //excluindo contato
    var index;
    for (var i = 0; i < this.emergencyContacts.length; i++) {
      if (this.emergencyContacts[i].numero === number) {
        index = i;
        break;
      }
    }
    this.emergencyContacts.splice(index, 1);
    localStorage.setItem("emergencycontacts", JSON.stringify(this.emergencyContacts));
  }

  async presentModal() { //chamando a modal com todos os contatos
    const modal = await this.modalController.create({
      component: ContactsPage
    });
    modal.onDidDismiss().then(() => { //quando a modal for encerrada carregar os contatos de emergencia na tab1.html
      if (localStorage.getItem("emergencycontacts")) {
        this.emergencyContacts = JSON.parse(localStorage.getItem("emergencycontacts"));
      }
    })
    return await modal.present();
  }
}
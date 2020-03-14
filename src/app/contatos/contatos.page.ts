import { Component, OnInit } from '@angular/core';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { ActivatedRoute, Router } from '@angular/router';
//import { Storage } from '@ionic/storage';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {
  todosContatos: any;
  id:number;
  data: any;
  searchTerm: string;

  constructor(private contacts: Contacts, private route: ActivatedRoute, private router: Router, private storage: Storage) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.id;
      }
    });
    this.getFromContacts('');
    this.data = {};
  }
  

  ngOnInit() {
  }

  getFromContacts(filter:string){
    let options = {
      filter: filter, //para a barra de pesquisa
      multiple: true,
      hasPhoneNumber: true,
    };
    //this.todosContatos = this.contacts.find(["*"]);
    this.contacts.find(['*'], options).then((contacts: Contact[])=> {
      this.todosContatos = contacts;
    });
    console.log(this.todosContatos);
    //this.todosContatos.forEach(console.log('test'));
  }

  passaContact(number: string, nome:string) {
    this.addContato(number, this.id, nome);
    this.router.navigate(['/tabs/tab1']);
  }

  async addContato(tel:string, id:number, nome:string){ //G
    await Storage.set({
      key: 'nome' + id,
      value: nome,
    });
    await Storage.set({
      key: 'phoneNumber' + id,
      value: tel,
    });
  }
}

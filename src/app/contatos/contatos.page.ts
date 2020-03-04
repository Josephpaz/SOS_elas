import { Component, OnInit } from '@angular/core';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {
  todosContatos: any;
  id: number;
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

  getFromContacts(filter: string) {
    let options = {
      filter: filter, //para a barra de pesquisa
      multiple: true,
      hasPhoneNumber: true,
    };
    //this.todosContatos = this.contacts.find(["*"]);
    this.contacts.find(["*"], options).then((contacts: Contact[]) => {
      this.todosContatos = contacts;
      this.todosContatos.sort((a: any, b: any) => {
        if (a.name.givenName > b.name.givenName)
          return 1;
        if (a.name.givenName < b.name.givenName)
          return -1;
        return 0;
      })
    });
    console.log(this.todosContatos);
  }

  passaContact(number: string, nome: string) {
    //alert(nome + ' ' + number);
    this.addContato('Contatos', this.id, nome, number);
    this.router.navigate(['/tabs/tab1']);
    //alert('Contato adicionado!');
  }

  //Retirado da internet
  // set a key/value
  setValue(key: string, value: any) {
    this.storage.set(key, value).then((response) => {
      console.log('set' + key + ' ', response);

      //get Value Saved in key
      this.getValue(key);

    }).catch((error) => {
      console.log('set error for ' + key + ' ', error);
    });
  }

  // get a key/value pair
  getValue(key: string) {
    this.storage.get(key).then((val) => {
      console.log('get ' + key + ' ', val);
      this.data[key] = "";
      this.data[key] = val;
    }).catch((error) => {
      console.log('get error for ' + key + '', error);
    });
  }
  //FIM Retirado da internet

  addContato(key: string, id: number, nome: string, telefone: string) { //G
    this.storage.get(key).then((dados) => {
      console.log(dados);
      dados[id].nome = nome;
      dados[id].telefone = telefone;
      this.setValue('Contatos', dados);
    });
  }

}

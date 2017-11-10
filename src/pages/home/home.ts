import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


interface ResultatRecherche {
  title:string;
  author:string;
  date:number;
  image:string;
}
const RESULTAB : ResultatRecherche[]=[{
  title: "titre", author: "author", date: 2017, image: "https://www.saint-mary.church/wp-content/uploads/2016/09/lorem-ipsum-logo.jpg"}];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  resultat = RESULTAB;
  constructor(public navCtrl: NavController) {

  }

}

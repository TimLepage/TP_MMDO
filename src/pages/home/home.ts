import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';


export interface ResultatRecherche {
  title:string;
  author:string;
  date:number;
  image:string;
}
const RESULTAB : ResultatRecherche[]=[{
  title: "titre1", author: "author1", date: 2017, image: 'img src ="https://www.saint-mary.church/wp-content/uploads/2016/09/lorem-ipsum-logo.jpg"'},
  {
    title: "titre2", author: "author2", date: 2018, image: 'img src ="https://www.saint-mary.church/wp-content/uploads/2016/09/lorem-ipsum-logo.jpg"'
  },
  {
    title: "titre3", author: "author3", date: 2019, image: 'img src ="https://www.saint-mary.church/wp-content/uploads/2016/09/lorem-ipsum-logo.jpg"'
  }];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  searchres: Array<ResultatRecherche> = [];
  query : string = '';
  show_no_result : boolean = true;
  constructor(public navCtrl: NavController) {
  }

  onInput(): void {
    console.log(this.query);
    if (this.query == '') {
      this.searchres = [];
      this.show_no_result = true;
    }
    else {
      this.show_no_result = false;
      this.searchres = RESULTAB;
    }
  }

  push(item: ResultatRecherche): void{
    this.navCtrl.push(DetailsPage, {item});
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';



export interface ResultatRecherche {
  title:string;
  overview:string;
  release_date:number;
  poster_path:string;
}

const key: string = 'ebb02613ce5a2ae58fde00f4db95a9c1';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  searchres: Observable<ResultatRecherche[]>=null;
  query : string = '';
  show_no_result : boolean = true;
  //constructor(public navCtrl: NavController) {
  //  }

  constructor(public navCtrl: NavController, private http: HttpClient) { }

  onInput(): void {
    console.log(this.query);
    if (this.query == '') {
      this.searchres = null;
      this.show_no_result = true;
    }
    else {
      this.show_no_result = false;
      this.searchres = this.fetchResults();
    }
  }

  push(item: ResultatRecherche): void{
    this.navCtrl.push(DetailsPage, {item});
  }

  fetchResults(): Observable<ResultatRecherche[]> {
    return this.http.get<ResultatRecherche[]>("https://api.themoviedb.org/3/search/movie", {
      params: new HttpParams().set('api_key', key).set('query', this.query)
    }).pluck("results");
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Shake } from '@ionic-native/shake';


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
  private shakeSubscription: Subscription;

  searchres: Observable<ResultatRecherche[]>=null;
  query : string = '';
  show_no_result : boolean = true;
  //constructor(public navCtrl: NavController) {
  //  }

  constructor(public navCtrl: NavController, private http: HttpClient, public alertCtrl: AlertController, private shake: Shake) { }

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

  discoverMovies(): Observable<ResultatRecherche[]>{
    return this.http.get<ResultatRecherche[]>("https://api.themoviedb.org/3/discover/movie", {
      params: new HttpParams().set('api_key', key).set('primary_release_year', "2018")
    }).pluck("results");
  }

  test(): void{
    this.discoverMovies().subscribe(movies=>this.showRandomMovieAlert(movies));
  }

  showRandomMovieAlert(movies: ResultatRecherche[]): void{
    var item : ResultatRecherche = movies[Math.floor(Math.random() * movies.length)];
    let confirm = this.alertCtrl.create({
      title: item.title,
      message: item.overview,
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Details',
          handler: () => {
            this.push(item);
          }
        }
      ]
    });
    confirm.present();
  }


  ionViewDidEnter(){
    this.shakeSubscription = this.shake.startWatch().switchMap(()=>this.discoverMovies()).subscribe(movies=>this.showRandomMovieAlert(movies));
  }
  ionViewWillLeave(){
    this.shakeSubscription.unsubscribe();
  }
}






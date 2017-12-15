import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ResultatRecherche } from '../home/home';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  movie : ResultatRecherche;
  constructor(public navParams: NavParams) {
    this.movie = navParams.get('item');
  }

}

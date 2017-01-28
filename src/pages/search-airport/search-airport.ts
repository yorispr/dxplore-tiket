import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {HomePage} from "../home/home";


/*
  Generated class for the SearchAirport page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-airport',
  templateUrl: 'search-airport.html'
})
export class SearchAirportPage {
  airport;
  defaultairport;

  kode:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public viewCtrl:ViewController) {
    this.http.get('http://localhost/dxplortiket/GetAirport.php').map(res => res.json()).subscribe(data => {
      this.airport = data;
      this.defaultairport = data;
      //console.log(this.airport);
    });
    this.kode = navParams.get("kode");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchAirportPage');
  }

  initializeItems() {
    this.airport = this.defaultairport;
  }

  getItems(ev: any) {
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
        this.airport = this.airport.filter((item) => {
          //console.log(item.name.toLowerCase().indexOf(val.toLowerCase()))
        if(item.name != null) {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.city.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  passToHome(data){
    this.viewCtrl.dismiss({
      kode : this.kode,
      airportdata : data,
    });

    /*
    console.log(data);
    this.navCtrl.pop();
    this.navCtrl.push(HomePage,{
      airportdata : data,
      kode : this.kode
    });
    */
  }

}

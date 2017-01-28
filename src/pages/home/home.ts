import { Component } from '@angular/core';

import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import {FlightSearchResultPage} from "../flight-search-result/flight-search-result";
import {SearchAirportPage} from "../search-airport/search-airport";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public airlinearray = Array();

  public minin;
  public minout;

  public checkinmin;

  public isSearchAirportFrom = false;
  public isSearchAirportTo = false;

  public airport :any;


  flight = {
    fromcity: '',
    tocity: '',
    departdate: '',
    returndate: '',
    adult: 1,
    child: 0,
    infant: 0,
    isOneWay: true,
  };

  public passengerscount = Array();
  public passengerscountchild  = Array();

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {

    this.checkinmin = new Date();
    this.minin = this.checkinmin.toISOString();
    this.minout= this.checkinmin.toISOString();

    var todaydate = new Date();

    this.flight.departdate   = todaydate.toISOString();
    this.flight.returndate  = todaydate.toISOString();

    for(var i=1;i<=7;i++){
      this.passengerscount[i] = i;
    }

    for(var i=0;i<7;i++){
      this.passengerscountchild[i] = i;
    }

      if(this.navParams.get("airportdata")){
        console.log(this.airport);
        this.airport = this.navParams.get("airportdata");
        let kode = this.navParams.get("kode");
        if(kode == 0){
          this.flight.fromcity =  "("+this.airport.iata+") " + this.airport.city ;
        }
        else if(kode == 1){
          this.flight.tocity =  "("+this.airport.iata+") " + this.airport.city ;
        }
      }


  }

  showAirport(code){
    /*
    if(code == 0){
      this.isSearchAirportFrom = true;
    }else if(code == 1){
      this.isSearchAirportTo = true;
    }
    this.navCtrl.push(SearchAirportPage, {
      kode :code
    });*/

    let modal = this.modalCtrl.create(SearchAirportPage,{
      kode: code
    });

    modal.onDidDismiss(data => {
      console.log('Data', data);
      if(data){
        this.airport = data.airportdata;
        if(data.kode == 0){
          this.flight.fromcity =  "("+this.airport.iata+") " + this.airport.city ;
        }else if(data.kode == 1){
          this.flight.tocity =  "("+this.airport.iata+") " + this.airport.city ;
        }
      }
    });

    modal.present();

  }

  disableArrivalTime(){
      this.flight.isOneWay = false;
  }

  submitData(form) {
    //console.log(form.value.departdate.split("T")[0]);
    if(this.flight.isOneWay){
      this.flight.returndate = '';
    }
    //var formatdate = this.formatDate(this.flight.departdate);
    //var formatdate2 = this.formatDate(this.flight.returndate);


    this.flight.departdate = this.formatDate(this.flight.departdate);
    if(this.flight.returndate != ''){
      this.flight.returndate = this.formatDate(this.flight.returndate);
    }

    //this.flight.tocity = this.getAirportParentheses(this.flight.tocity);
    //this.flight.fromcity = this.getAirportParentheses(this.flight.fromcity);

    this.navCtrl.push(FlightSearchResultPage, {
      flightinfo: this.flight
    });
  }


  formatDate(date) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var d = new Date(date),
      month = '' + months[(d.getMonth() + 1)],
      day = '' + d.getDate(),
      year = d.getFullYear();

    //if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day,month,year].join('-');
}
}


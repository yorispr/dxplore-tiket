import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the FlightDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-flight-detail',
  templateUrl: 'flight-detail.html'
})
export class FlightDetailPage {
  flightinfo:any;
  searchinfo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.flightinfo = navParams.get("flightinfo");
    this.searchinfo = navParams.get("searchinfo");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlightDetailPage');
  }

  getImage(logo){

      //let url = "../../../www/assets/img/";
      switch (logo) {
        case "GA" :
          logo = "garuda.jpg";
          break;
        case "SJ" :
          logo = "sriwijaya.jpg";
          break;
        case "QG" :
          logo = "citilink.jpg";
          break;
        case "QZ" :
          logo = "airasia.jpg";
          break;
        case "JT" :
          logo = "lionair.jpg";
          break;
        case "IN" :
          logo = "nam.jpg";
          break;
      }

    var img = "http://localhost/airlinesicon/"+ logo;
    return img;
  }

  getAirlineName(name){

      switch (name){
        case "GA" :
          name = "GARUDA";
          break;
        case "SJ" :
          name = "SRIWIJAYA";
          break;
        case "QG" :
          name = "CITILINK";
          break;
        case "QZ" :
          name = "AIR ASIA";
          break;
        case "JT" :
          name = "LION AIR";
          break;
        case "IN" :
          name = "NAM AIR";
          break;

    }
    //let url = "../../../www/assets/img/";

    return name;
  }

  getFlightCode(flight){

    for(var i=0;i<flight.length;i++){
      let name = flight[i].airlinecode[0];

      switch (name){
        case "GA" :
          name = "GARUDA";
          break;
        case "SJ" :
          name = "SRIWIJAYA";
          break;
        case "QG" :
          name = "CITILINK";
          break;
        case "QZ" :
          name = "AIR ASIA";
          break;
        case "JT" :
          name = "LION AIR";
          break;
        case "IN" :
          name = "NAM AIR";
          break;
      }

    }
    //let url = "../../../www/assets/img/";

    return name;
  }

  getTransitTime(airport){
    var reverseFlightinfo = this.flightinfo.listflight[0].flight ;
    reverseFlightinfo.reverse();
    let d1:any;
    let d2:any ;

    var milisecond = 0;

    if(reverseFlightinfo.length == 1){
        var flight = reverseFlightinfo[0];
        d1 = this.parseDate(flight.departdate + " " + flight.departtime + ":00");
        d2 = this.parseDate(flight.departdate + " " + flight.arrivetime + ":00");
        milisecond = d2-d1;
        var hours   = ((milisecond / (1000*60*60)) % 24);
        var minutes = ((milisecond / (1000*60)) % 60);

        return  Math.trunc(hours) +" jam " + minutes + " menit, Direct";

    }
    else{
      for(var i=0;i<reverseFlightinfo.length;i++) {
        if (i != reverseFlightinfo.length - 1) {
          var flight = reverseFlightinfo[i];
          d1 = this.parseDate(flight.departdate + " " + flight.departtime + ":00");
          milisecond = d1;
          var flight2 = reverseFlightinfo[i+1];
          d2 = this.parseDate(flight2.departdate + " " + flight2.arrivetime + ":00");
          //console.log(d2);
          milisecond -= d2;
        }
      }
      console.log(milisecond);
      var hours   = ((milisecond / (1000*60*60)) % 24);
      var minutes = ((milisecond / (1000*60)) % 60);

      if(hours < 0){
        return "";
      }else{
        return "Transit " + Math.trunc(hours) +" jam " + minutes + " menit " + "di " + airport;
      }
    }




    //console.log("d1 = ",d1);
    //console.log("d2 = ",d2);

  }

  parseDate(strdate){
     let strdate2 = strdate.replace(/-/g,"/");
     //console.log(Date.parse(strdate2));
      return Date.parse(strdate2);
  }

  toDate(dateStr) {
    let parts = dateStr.split("-");
    console.log(parts);
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

}

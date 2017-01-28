import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';
import {FlightDetailPage} from "../flight-detail/flight-detail";


/*
  Generated class for the FlightSearchResult page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-flight-search-result',
  templateUrl: 'flight-search-result.html'
})
export class FlightSearchResultPage {

  public flight:any;
  loader :any;

  public searchResponse :any;
  public ItemArray:any;
  public flightArray = Array();
  public priceArray = Array();
  fromcityname;
  tocityname;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http   : Http, public loadingController: LoadingController) {

    this.loader = this.loadingController.create({
      content: "Mencari penerbangan..."
    });
    this.flight = navParams.get('flightinfo');
    this.loadXML(this.flight);
    console.log(this.flight);

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FlightSearchResultPage');
  }

  getCityNameFrom(iata){
    let city :any;
    this.http.get('http://localhost/dxplortiket/GetAirportCity.php?iata='+iata).map(res => res.json()).subscribe(data => {
      this.fromcityname = data.iata;
    });
  }

  loadXML(flight)
  {
    var listairline = ['GA','SJ','IN','QG','QZ','AK','XT','JT','IW','ID','OD','SL','KD','IL','MV'];
    //console.log(listairline);


    this.http.get("http://localhost/dxplortiket/sha1.php?" +
      "fromcity=" +  this.removeAirportParentheses(flight.fromcity)
      +"&tocity=" +  this.removeAirportParentheses(flight.tocity)
      +"&departdate=" +flight.departdate
      +"&returndate=" +flight.returndate
      +"&listairline=" +JSON.stringify(listairline)
      +"&adult=" +flight.adult
      +"&child=" +flight.child
      +"&infant=" +flight.infant
    )
      .map(res => res.text())
      .subscribe((data)=>
      {
        this.parseXML(data)
          .then((data)=>
          {
            this.searchResponse = data;
            this.ItemArray = this.searchResponse.trip[0].listitem[0].item;

            for(var i=0;i<this.ItemArray.length;i++){
              var item = this.ItemArray[i];
              var listflight = item.listflight[0];

              var flight = listflight.flight;
              //console.log(flight)
              for(var j=0;j<flight.length;j++){
                this.flightArray.push(flight[j]);
                //console.log(flight[j]);
              }

              var listclassgroup = item.listclassgroup[0];
              var classgroup = listclassgroup.classgroup;

              for(var k=0;k<classgroup.length;k++){
                this.priceArray.push(classgroup[k]);
              }

            };

            //console.log(this.flightArray);
            //this.loader.dismiss();

          });
      });
  }

  removeAirportParentheses(data){
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(data);
    console.log(matches[1]);

    return matches[1];
  }

  public getCheapestPrice(data){
    let min;
    for(let j=0;j<data.class.length;j++){
      if(data.class[j].fare[0] > 0 ){
        min = data.class[j].fare[0];
        //console.log(min)
        break;
      }
    }
    return min;
  }

  getPrice(classgroup){
    let price = 0;
    if(classgroup.length == 1){
      var kelas = classgroup[0];
      price = parseFloat(this.getCheapestPrice(kelas));

    }else{
      for(var i=0;i<classgroup.length;i++) {
        var kelas2 = classgroup[i];
        price +=  parseFloat(this.getCheapestPrice(kelas2));
      }
    }


    return this.numberWithCommas(price);
  }

   numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  getAirlineName(flight){

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

  getTime(flight){

    var transit = flight.length -1;
    let departtime,arrivetime;

    if(flight.length == 1){
      departtime = flight[0].departtime[0];
      arrivetime = flight[0].arrivetime[0];
    }else
    {
      for(var i=0;i<flight.length;i++){
        if(i==0){
          departtime = flight[i].departtime[0];
        }
        else if(i==flight.length-1){
          arrivetime = flight[i].arrivetime[0];
        }
      }
    }

    var time = departtime + " - " + arrivetime;
    if(transit == 0){
      time += ", Direct";
    }else{
      time += ", " + transit +" transit";
    }
    return time;
  }


  getImage(airline){
    let logo;

    for(var i=0;i<airline.length;i++) {
       logo = airline[i].airlinecode[0];
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
    }

    var img = "http://localhost/airlinesicon/"+ logo;
    return img;
  }


  parseXML(data)
  {
    return new Promise(resolve =>
    {
      var k,
        arr    = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });

      parser.parseString(data, function (err, result)
      {
        //console.log(result);
        var obj = result.response;
        //var item = result.SearchHotel_Response[0];

        arr = obj;
        //console.log(arr);
        resolve(arr);

      });

    });
  }

  showFlightDetail(data){
    this.navCtrl.push(FlightDetailPage, {
      flightinfo: data,
      searchinfo:this.flight
    });
  }
}

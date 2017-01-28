import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FlightSearchResultPage } from '../pages/flight-search-result/flight-search-result';
import {SearchAirportPage} from "../pages/search-airport/search-airport";
import {FlightDetailPage} from "../pages/flight-detail/flight-detail";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FlightSearchResultPage,
    SearchAirportPage,
    FlightDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FlightSearchResultPage,
    SearchAirportPage,
    FlightDetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

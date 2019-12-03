import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineServiceService } from '../../services/network-engine-service.service';
import { NavController, Platform, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const TICKET_ID_TO_SHOW_DETAILS = 'ticketidtoshowdetails';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.page.html',
  styleUrls: ['./ticketdetails.page.scss'],
})
export class TicketdetailsPage implements OnInit {

  ticket: any = '';
  ticketID = '';

  eventImage = '';

  isLoaded = false;

  constructor(private network: NetworkEngineServiceService, public navCtrl: NavController, public plt: Platform, public storage: Storage,
    private router: Router, private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.storage.get(TICKET_ID_TO_SHOW_DETAILS).then(ticketIdResult => {
      this.ticketID = ticketIdResult;
      console.log('ticketID to fetch Ticket details: ' + this.ticketID);

      this.network.getTicketDetailsByTicketID(this.ticketID).then(ticketData => {
        const jsonArray = ticketData;
        this.ticket = jsonArray[0];
        this.isLoaded = true;
        console.log('ticket data: ' + JSON.stringify(this.ticket));

        // get the event info from ticket
        this.eventImage = this.network.mainEventImagesUrl + this.ticket.Img;
      }).catch(err => {
        console.log(JSON.stringify(err));
        this.presentAlert('Please check your internet connection');
      });
    });
  }

  goBack() {
    this.router.navigate(['tickets']);
  }

  async presentAlert(text) {
    const alertCt = await this.alertCtrl.create({
      message: text
    });

    alertCt.present();
  }

  goForPayment() {
    this.router.navigate(['paypalpage']);
  }

}

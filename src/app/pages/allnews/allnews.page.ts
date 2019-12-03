import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineServiceService } from '../../services/network-engine-service.service';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-allnews',
  templateUrl: './allnews.page.html',
  styleUrls: ['./allnews.page.scss'],
})
export class AllnewsPage implements OnInit {

  allNews: any = '';
  newsImageURL = '';

  constructor(private network: NetworkEngineServiceService, public navCtrl: NavController, public plt: Platform, public storage: Storage,
    private router: Router) { }

  ngOnInit() {

    this.newsImageURL = this.network.mainNewsImagesUrl;

    // get all news
    this.network.getAllNews().then(newsData => {
      this.allNews = newsData;
    }).catch(err => {
      alert(JSON.stringify(err));
    })
  }

}

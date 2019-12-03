import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkEngineServiceService } from '../../services/network-engine-service.service';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const DEVICE_TOKEN_ID = 'device-id';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userInfo: any = '';
  errorMsg = '';

  deviceId = '';

  constructor(private network: NetworkEngineServiceService, public navCtrl: NavController, public plt: Platform, public storage: Storage,
    private router: Router) { }

  ngOnInit() {

    // get the device id
    this.storage.get(DEVICE_TOKEN_ID).then(deviceIdResult => {
      this.deviceId = deviceIdResult;
      console.log('the device ID is: ' + this.deviceId);
    });
  }

  goBack() {
    this.router.navigate(['login']);
  }

  signup(name, family, username, password, email) {

    if (email == null) { email = ''; }

    if ((name != null) && (name != '') && (family != null) && (family != '') && (username != null) && (username != '') && 
    (password != null) && (password != '')) {
      this.errorMsg = '';
      
      // check the duplication of username
      this.network.getUserByUsername(username).then(resultDate => {
        const jsonArray = resultDate;
        this.userInfo = jsonArray[0];
  
        if (this.userInfo == '0') {
          this.errorMsg = '';
          // insert a record for this user
          this.network.addOrEditUser(1, name, family, username, password, '', '', '', email, username, 'customer', 1, 'add', this.deviceId).then(insertingResult => {
            const jsonArray2 = insertingResult;
            console.log('the result of inserting: ' + JSON.stringify(jsonArray2));
            if (jsonArray2 == 'Successful') {
              alert('You signed up successfully. Now login with your Username');
              this.router.navigate(['login']);
            } else {
              this.errorMsg = 'Something goes wrong, Please try again!';
            }
          }).catch(err => {
            alert(JSON.stringify(err));
          });
        } else {
          this.errorMsg = 'This Username exists, Please choose another one!';
        }
      }).catch(err => {
        alert(JSON.stringify(err));
      });
    } else {
      this.errorMsg = 'Please fill the required fields!';
    }
  }

}

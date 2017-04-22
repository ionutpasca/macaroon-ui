import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../shared/shared';
import { Home } from '../pages';

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class Register {
    createSuccess = false;
    registerCredentials = { email: '', password: '', name: '' };

    constructor(private navCtrl: NavController,
        private navParams: NavParams,
        private auth: AuthService,
        private alertController: AlertController) { };

    ionViewDidLoad() {
        console.log('ionViewDidLoad Register');
    };

    public register() {
        this.auth.register(this.registerCredentials).subscribe(success => {
            if (success) {
                this.createSuccess = true;
                this.showPopup('Success', 'Account Created');
            } else {
                this.showPopup('Error', 'Problem creating account');
            }
        }, error => {
            this.showPopup('Error', error);
        });
    };

    showPopup(title, text) {
        let alert = this.alertController.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                        if (this.createSuccess) {
                            this.navCtrl.setRoot(Home);
                        }
                    }
                }
            ]
        });
        alert.present();
    };
};

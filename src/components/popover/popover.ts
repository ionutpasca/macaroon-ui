import { Component } from '@angular/core';
import { PopoverController, NavParams } from 'ionic-angular';

@Component({
    template: `
        <div class="popover">
            <button ion-button clear>Update</button>
            <button ion-button clear>Delete</button>
        </div>
    `
})
export class Popover {
    constructor(private navParams: NavParams) { };

    ngOnInit() {
        if (this.navParams.data) {

        }
    }
};
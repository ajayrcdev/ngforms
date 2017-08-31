import { Component } from '@angular/core';
import { User } from '../models/user';

@Component({
    selector:'login-form',
    templateUrl: 'login-form.component.html',
})
export class LoginFormComponent {
    user:User;

    constructor(){
        this.user = new User(0,'','','',0);
    }

    onSubmit(){
        console.log('form submitted: with email id=', this.user.userId, ' password=', this.user.password);
    }

}
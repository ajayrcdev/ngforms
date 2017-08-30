import { Component } from '@angular/core';
// import { User } from '../models/user';

@Component({
    selector:'login-form',
    templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {

    onSubmit(){
        event.preventDefault();
        console.log('form submitted:');
    }

}
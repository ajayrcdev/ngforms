import { Component } from '@angular/core';

@Component({
    selector:'login-form',
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    onSubmit(event){
        event.preventDefault();
        console.log('form submitted:');
    }

}
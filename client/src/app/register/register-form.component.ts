import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../models/user";

@Component({
    selector: 'register-form',
    templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent implements OnInit {

    registerForm: FormGroup;
    user: User;
    
    constructor() {
    }

    ngOnInit() {
        this.user = {
            id: 0,
            name: 'asdfg',
            userId: '',
            password: '',
            isActive: 0
        }

        this.buildForm(this.user);    
    }

    buildForm(user:User) {
        this.registerForm = new FormGroup({
            name: new FormControl('' , [Validators.required]),
            userId: new FormControl( '', [Validators.required, Validators.email] ),
            password: new FormControl('', [Validators.required])
        });
    }
}
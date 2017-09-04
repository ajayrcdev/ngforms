import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

@Component({
    selector: 'register-form',
    templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent implements OnInit {

    registerForm: FormGroup;
    user: User;
    
    constructor(private formBuilder: FormBuilder, private userService: UserService) {
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
        this.registerForm = this.formBuilder.group({
            name: ['' , Validators.required],
            userId: [ '', [ Validators.required, Validators.email ] ],
            password: ['', Validators.required]
        });
    }

    onSubmit(){
        this.userService.doUserRegistration(this.registerForm.value);
    }
}
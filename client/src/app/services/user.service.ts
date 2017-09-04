import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    constructor(private http: HttpClient){
    }

    doUserRegistration(data): void {
        console.log('submitting data=', JSON.stringify(data));
       this.http.post('http://localhost:8080/registerUser', data).
       subscribe( (response) => {
           console.log('server says', response)
       });
    }
}
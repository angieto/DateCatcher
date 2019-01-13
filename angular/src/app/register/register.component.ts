import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    newUser = { 
        firstname: '', 
        email: '', 
        password: '', 
        gender: '', 
        age: '', 
        city: '' 
    }
    confirmpassword;
    error: string;
    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
    }

    // Error not displayed on the front-end
    Register() {
        if (this.newUser.password !== this.confirmpassword) {
            this.error = 'Oops, your password didnt match, please try again!'
        } else {
            const obs = this._httpService.createUser(this.newUser);
            obs.subscribe((newUser: any) => {
                console.log('createUser server respons data:', newUser);
                if (newUser['errors']) {
                    const errors = newUser['errors'];
                    Object.keys(errors).forEach((key) => {
                        this.error = errors[key].message;
                    });
                } else {
                    console.log('Create User success', newUser);
                    this.newUser = { 
                        firstname: '', 
                        email: '', 
                        password: '', 
                        gender: '', 
                        age: '', 
                        city: '' 
                    };
                    return this._router.navigate(['/dashboard/' + newUser['_id']]);
                }
            });
        }
    }
}

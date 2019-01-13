import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
    id;
    contactInfo: any = {
        name: "",
        intro: "",
        phone: "",
        email: ""
    };
    constructor(private _httpService: HttpService,
                private _router: Router,
                private _route: ActivatedRoute) { }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            this.id = params.id;
            this.display(this.id);
        })
        this.display(this.id);
    }

    display(id) {
        if (id == 1) {
            this.contactInfo = {
                name: "Brian Ho",
                intro: "Backend and Database Management",
                phone: "222-222-222",
                email: "samoyed@gmail.com"
            }
        } else if (id == 2) {
            this.contactInfo = {
                name: "Angie To",
                intro: "Frontend and Project Management",
                phone: "510-333-0066",
                email: "bunbun@gmail.com"
            }
        } else if (id == 3) {
            this.contactInfo = {
                name: "Richard Bullock",
                intro: "Middle-end and API Technologies",
                phone: "555-555-555",
                email: "seriousmeow@gmail.com"
            }
        } 
    }
}

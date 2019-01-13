import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

      // only the user data that we need
      _currentUser;

    constructor(private _httpService : HttpService,
            private _route : ActivatedRoute,
            private modalService: NgbModal) { }

    ngOnInit() {
        this._route.parent.params.subscribe((params: Params) => {
            console.log(params);
            let observer = this._httpService.getUser(params.id);
            observer.subscribe(data => {
                if(data['errors']) {
                    console.log("There were errors grabbing user:", data['errors']);
                }
                else {
                    console.log("CurrentUser grabbed");
                    this._currentUser = data;
                }
            })
        })
    }
}

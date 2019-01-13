import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params,Router } from  '@angular/router';

@Component({
    selector: 'app-generateplan',
    templateUrl: './generateplan.component.html',
    styleUrls: ['./generateplan.component.css']
})
export class GenerateplanComponent implements OnInit {

    _currentUser: any = {
        firstname : "",
        _id : "",
        Date : []
    }
  
    _dateForm: any = {
        datetime: null,
        activity: "",
        location: "",
        dressCode: null, // dresscode is not random, switched from string to null
        user1: "",
        user2: "",
        invitaion: true
    }

    beErrors: {
        name : { message : ""}, // why do we have an error in name???
        dressCode : { message : ""},
        datetime : { message : ""} // switched from date, time to "datetime"
    }
    
    activityObj: any = {
        activity: "",
        locations: [""]
    };

    constructor(
        private _httpService : HttpService,
        private _route : ActivatedRoute,
        private _router: Router
    ) { }


    ngOnInit() {
        this._route.parent.params.subscribe((params: Params) => {
            let observer = this._httpService.getUser(params.id);
            observer.subscribe(data => {
                if(data['errors']) {
                    console.log('There were errors getting current user:', data['errors']);
                }
                else{
                    console.log("Current User found.", data)
                    this._currentUser['_id'] = data['_id'];
                    this._currentUser['firstname'] = data['firstname'];
                    this._currentUser['city'] = data['city'];
                    this._currentUser['Date'] = data['Date'];
                    this._currentUser['gender'] = data['gender'];
                    this._dateForm.user1 = this._currentUser['_id'];
                    this.getRandomMatch();
                }
            })
        })
        
    }

    // createDate will first grab a randomly matched user and attach it to the dateForm
    // it will then create the date with user1 (the inviter)
    // then it will take this date info and push it to user2

    createDate(){
        console.log("Hitting createDate");
        this.errorsReset(this.beErrors);
        if (this._dateForm.user2 != ""){
            console.log("createDate form data:", this._dateForm)
            let observer = this._httpService.createDate(this._currentUser._id, this._dateForm);
            observer.subscribe(createData => {
                console.log("createDate data:",createData)
                if(createData['errors']){
                    console.log("There were errors creating date:", createData['errors'])
                    if(createData['errors']['name']){
                        this.beErrors['name'] =  createData['errors']['name'];
                    }
                    if(createData['errors']['datetime']){
                        this.beErrors['datetime'] =  createData['errors']['datetime'];
                    }
                    if(createData['errors']['dressCode']){
                        this.beErrors['dressCode'] =  createData['errors']['dressCode'];
                    }
                }
                else{
                    console.log("Date Created")
                    let _dateData = createData;
                    console.log(_dateData);
                    console.log(this._dateForm);
                    console.log(_dateData['Date'][_dateData['Date'].length-1]['user2']);
                     
                    // push to invited user's date array
                    let secondObs = this._httpService.updateUser(_dateData['Date'][_dateData['Date'].length-1]['user2'], this._dateForm);
                    secondObs.subscribe(pushDateData => {
                        console.log("Create Date data:", pushDateData);
                        if (pushDateData['errors']){
                            // if there is a failur to push date into other user's date array, delete the date from the database.
                            console.log("Failed to add date to invitee, attempting to delete date:", pushDateData['errors']);
                            let deleteObs = this._httpService.deleteDate(_dateData['Date'][_dateData['Date'].length-1]);
                            deleteObs.subscribe(deleteData => {
                                if (deleteData['errors']){
                                    console.log("Delete date had errors..... now what?:", deleteData['errors']);
                                }
                                else {
                                    console.log("Date delete has returned:", deleteData);
                                }
                            })
                        }
                        else {
                            console.log("Date successfully created!", pushDateData);
                            return this._router.navigate(['/dashboard/',this._currentUser['_id']]);
                        }
                    })       
                }
            })
        }
    }

    // grabs a random user that matches well
    // model.find based on logged in user's preferences
    // returns an array with which we can generate a random number
    // possibly only include those who don't currently don't have invites or less than 3 or somethig like that
  
    getRandomMatch(){
        console.log("hitting getRandoMatch")
        let observer = this._httpService.getUsers(this._currentUser.city);
        observer.subscribe(data => {
            console.log("random match potentials:", data)
            let _potentialMatches = data;
            let shortlist = [];
            let shorterlist = [];
            for(let user in _potentialMatches){
            
                // Remove logged in user from the list if that shows up.
                if (_potentialMatches[user]['_id'] != this._currentUser['_id']){
                    shortlist.push(_potentialMatches[user]);
                    console.log("After Removing logged in user", shortlist)
                }
            }
                // Check gender (might happen in the query instead)
            
            for(let user in shortlist){
        
                if (shortlist[user]['gender'] != this._currentUser['gender']) {
                    shorterlist.push(shortlist[user]);
                    console.log("After Removing non-opposites", shorterlist)
                }
            }
            // Removing the possibility of inviting a user that they already have invited on another date
            
            let num = Math.floor(Math.random() * Object.keys(shorterlist).length);
            this._dateForm.user2 = shorterlist[num]['_id'];
            console.log("The one:", this._dateForm.user2);
            return;
        })
    }

    // grab a random activity and location from the activities array.

    getRandomActivity(){
        let activities = this._httpService.activities;
        console.log("length",this._httpService.activities.length)
        this.activityObj = activities[Math.floor(Math.random()* activities.length)];
        console.log("Date activity selected:",this.activityObj);
        this.getRandomLocation();
        this._dateForm.activity = this.activityObj.activity;
    }

    getRandomLocation(){
        this._dateForm.location = this.activityObj.locations[Math.floor(Math.random() * this.activityObj.locations.length)];
    }

    errorsReset(errors){
        for (let key in errors) {
            key['message'] = "";
        }
    }

}

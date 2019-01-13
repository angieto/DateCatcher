import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  activities = [
    {activity : "Code at coding Dojo", locations: ["Coding Dojo"]},
    {activity : "Visit a park", locations: ["Jefferson Park", "Lakeridge Park", "Lake Union Park", "Ravenna Park", "Sand Point Magnuson Park", "Woodland Park and Rose Garden"]}, 
    {activity : "Watch a movie", locations: ["AMC Pacific Place 11", "Big Picutre", "Cinerama", "Grand Illusion Cinema", "Majestic Bay Theatres", "Regal Cinemas Meridian 16", "SIFF Cinema Uptown", "The Varsity Theatre"]},
    {activity : "Get a coffee", locations: ["Ballard Coffee Works (Ballard)", "Caffe Vita (Fremont)", "Lighthouse Roasters (Fremont)"]},
  ];
    // "Scavenger hunt", 
    // "Watch the sunset", "Visit a zoo", "Roller-skating", "Ice-skating", "Rock climbing", "Hit the gym",
    // "Visit a bookstore", "Visit a psychic", "Visit an art museum", "Play hide and seek", "Play ping-pong", 
    // "Play frisbee", "Play board games", "Play chess", "Play escape room", "Skydiving", "Go-kart racing",
    // "Fly kites", "Visit a local animal shelter", "Make wishes at a fountain", "Climb a tree", "Bake a cake", 
    // "Sing karaoke", "Sing in public", "Dance in public", "Go flower picking", "Go fruit picking", 
    // "Go to a water park", "Visit a farmers’ market", "Go birdwatching", "Visit a local botanical gardens",
    // "Go shopping and buy each other gifts", "Crash a wedding", "Arm-Wrestling"];


  constructor(private _http: HttpClient) { }
  createUser(body){
    return this._http.post('/api/User/new', body);
  }
  createDate(user1_id, body){
    return this._http.put('api/User/newdate/' + user1_id, body);
  }
  getLoginUser(body){
    return this._http.get('/api/User/login', body);
  }
  getUser(userId){
    return this._http.get('/api/User/' + userId);
  }
  login(loginUser){
    return this._http.post("api/login", loginUser);
  }
  getUsers(city){
    return this._http.get('/api/Users/'+city);
  }
  updateUser(user2_id, body){
    console.log("updateuser: ", user2_id)
    console.log(body)
    return this._http.put('api/User2/' + user2_id, body);
  }
  deleteDate(date_id){
    return this._http.delete('api/Date/Destroy/' + date_id);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any = "";
  loginUser = {email:"", password:""};
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  
  Login(){
    this.error = "";
    console.log("Hitting Login:", this.loginUser);
    let obs = this._httpService.login(this.loginUser);
    obs.subscribe(data=>{
      console.log(data);
      if(data == null){
        console.log("Unable to find user");
        this.error = "Either your email or password was wrong.";
      }
      else{
        console.log("User logged in!");
        this._router.navigate(['dashboard/'+data['_id']]);
      }
    })
  }
}

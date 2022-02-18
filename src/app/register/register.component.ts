import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  confirmCode: boolean = false;
  codeWasConfirmed : boolean = false;
  error: string ="";

  constructor(private auth: AuthorizationService, private _router: Router) { }

  register(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.auth.register(email, password).subscribe((data: any) => {
      this.confirmCode=true
    }, (err: any) => {
      console.log(err);
      this.error = "Registration Error has occured" 
    });
  }

  validateAuthCode(form: NgForm){
    const code = form.value.code;
    this.auth.confirmAuthCode(code).subscribe(
      (data: any)=> {
        //this._router.navigateByUrl('/');
        console.log("le code est " + code);
        
        this.codeWasConfirmed = true;
        this.confirmCode=false;
      },
      (err: any)=> {
        console.log(err);
        this.error = "Confirm Authorization Error has occured";
      });
  }

  ngOnInit(): void {
  }

}

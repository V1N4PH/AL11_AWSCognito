import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailVerificationMessage:boolean = false;

  constructor(private auth: AuthorizationService, private _router: Router) { }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    this.auth.signIn(email, password).subscribe((data: any)=> {
      this._router.navigateByUrl('/restapi');
    }, (err: any) => {
      this.emailVerificationMessage=true;
    });
  }

  ngOnInit(): void {
  }

}

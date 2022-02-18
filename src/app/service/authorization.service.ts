import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId:'eu-west-3_2BeLe7hb8', //à adapter !!
  ClientId:'1di5ndh2gfn2j46jsg3sth47rq' // à adapter !!
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  cognitoUser: any;

  constructor() { }

  /*register(email:string, password:string){
    const attributeList=[];

    const observable$: Observable<any> = new Observable((observer: { error: (arg0: string) => void; next: (arg0: any) => void; complete: () => void; }) => {
      if(email != "mm@gmail.com" || password != "mypass"){
        console.log("signUp error");
        observer.error("Bad credential");
      }
      else {
        this.cognitoUser= {"name": "Doum"};
        console.log("signUp success", this.cognitoUser);
        observer.next(this.cognitoUser);
        observer.complete();
      }
    });

    return observable$;
  }*/

  register(email:string, password:string){
    const attributeList: CognitoUserAttribute[]=[];

    return new Observable(observer => {
      userPool.signUp(email, password, attributeList, [], (err, result) => {
        if(err){
          console.log(JSON.stringify(err));
          observer.error(err);
        }

        this.cognitoUser = result?.user;
        console.log('signUp success', result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  /*signIn(email: any, password: any){
    return new Observable(observer => {
      if(email !="mm@gmail.com" || password != "mypass"){
        console.log("signUp error");
        observer.error("Bad credential");
      }
      else {
        this.cognitoUser= {"name":"Doum"};
        observer.next(this.cognitoUser);
        observer.complete();
      }
    });
  }*/

  signIn(email: any, password: any){
    const authenticationData={
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username:email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    return new Observable(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result){
          //console.log(err);
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err){
          console.log(err);
          observer.error(err);
        },
      });
    });
  }
/*
  isLoggedIn(){
    return this.cognitoUser !=null;
  }
  */
  isLoggedIn(){
    return userPool.getCurrentUser() != null;
  }
/*
  confirmAuthCode(code: any){
    return new Observable((observer) => {
      if(code != "abcd"){
        console.log(code);
        console.log("Bad code");
        observer.error("Bad validation code");
      }
      else {
        console.log("confirmAuthCode() success");
        observer.next("Confirm code ok");
        observer.complete();
      }
    });
  }*/

  confirmAuthCode(code:any){
    const user = {
      Username : this.cognitoUser.username,
      Pool: userPool
    };
    return new Observable(observer =>{
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result){
        if(err){
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(result);
        observer.complete()
      });
    });
  }
/*
  getAuthenticatedUser(){
    return {"name":"Doum", "prenom":"mbengue"}
  }
*/
getAuthenticatedUser(){
  return userPool.getCurrentUser();
}
 /* logout(){
    this.cognitoUser=null;
  }*/

  logout(){
    this.getAuthenticatedUser()?.signOut();
    this.cognitoUser=null;
  }
}


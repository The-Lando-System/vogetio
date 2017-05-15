import { Component, OnInit, Input } from '@angular/core';
import { UserService, User, Broadcaster } from 'sarlacc-angular-client';

import { Globals } from '../globals';

declare var SockJS: any;
declare var Stomp: any;

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.css' ],
  providers: [ ]
})
export class HomeComponent implements OnInit {

  user: User;

  private homeLoading = false;

  constructor(
    private userSvc: UserService,
    private broadcaster: Broadcaster,
    private globals: Globals
  ){}

  ngOnInit(): void {
    this.homeLoading = true;
    
    this.initUser();
    this.listenForLogin();
    this.listenForLogout();
  }

  initUser(): void {
    this.userSvc.returnUser()
    .then((user:User) => {
      this.user = user;
      this.homeLoading = false;
    }).catch((res:any) => {
      this.homeLoading = false;
    });
  }

  listenForLogin(): void {
   this.broadcaster.on<string>(this.userSvc.LOGIN_BCAST)
    .subscribe(message => {
      this.userSvc.returnUser()
      .then((user:User) => {
        this.user = user;
        this.homeLoading = false;
      }).catch((res:any) => {
        console.log('User is not logged in');
        this.homeLoading = false;
      });
    });
  }

  listenForLogout(): void {
    this.broadcaster.on<string>(this.userSvc.LOGOUT_BCAST)
    .subscribe(message => {
      this.user = null;
    });
  }

}
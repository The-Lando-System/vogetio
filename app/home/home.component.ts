import { Component, OnInit, Input } from '@angular/core';
import { UserService, User, Broadcaster } from 'sarlacc-angular-client';

import { Site } from '../site/site';

import { Globals } from '../globals';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.css' ],
  providers: [ ]
})
export class HomeComponent implements OnInit {

  user: User;

  sites: Site[] = [];

  private homeLoading = false;

  constructor(
    private userSvc: UserService,
    private broadcaster: Broadcaster,
    private globals: Globals
  ){}

  ngOnInit(): void {
    this.homeLoading = true;
    
    this.initSites();

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

  private initSites() {
    let s1 = new Site();
    s1.name = 'Sarlacc';
    s1.description = 'Service for managing users';
    s1.url = 'http://sarlacc.voget.io';
    s1.image = 'resources/images/sarlacc.png'
    this.sites.push(s1);

    let s2 = new Site();
    s2.name = 'Info Manager';
    s2.description = 'Create and organize encrypted notes';
    s2.url = 'http://info-manager.voget.io';
    s2.image = 'resources/images/info-manager.png'
    this.sites.push(s2);

    let s3 = new Site();
    s3.name = 'R5-D4';
    s3.description = 'Check your network speed';
    s3.url = 'http://r5d4.voget.io';
    s3.image = 'resources/images/r5d4.png'
    this.sites.push(s3);

    let s4 = new Site();
    s4.name = 'The Cantina';
    s4.description = 'Listen and download music';
    s4.url = 'http://cantina.voget.io';
    this.sites.push(s4);

  }

}
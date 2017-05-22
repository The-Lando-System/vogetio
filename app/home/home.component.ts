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
    this.addSite('Sarlacc','Service for managing users','http://sarlacc.voget.io');
    this.addSite('Info Manager','Create and organize encrypted notes','http://info-manager.voget.io');
    this.addSite('Dashboard','Custom widgets for weather, stocks, etc.','http://dashboard.mattvoget.com');
    this.addSite('The Cantina','Listen to and download music','http://cantina.voget.io');
    this.addSite('R5-D4','Check your network speed','http://r5d4.voget.io');
    this.addSite('mattvoget.com','My First Website','http://mattvoget.com');
  }

  addSite(name:string, desc:string, url:string): void {
    let site = new Site();
    site.name = name;
    site.description = desc;
    site.url = url;
    this.sites.push(site);
  }

}
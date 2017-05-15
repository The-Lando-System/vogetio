import { Component, OnInit, Input } from '@angular/core';

import { Site } from './site';

@Component({
  moduleId: module.id,
  selector: 'site',
  templateUrl: 'site.component.html',
  styleUrls: [ 'site.component.css' ],
  providers: [ ]
})
export class SiteComponent implements OnInit {

  @Input()
  site: Site;

  constructor(
  ){}

  ngOnInit(): void {
  }

}
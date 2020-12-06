import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav', // this tells you what to embed in another page to show this component
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

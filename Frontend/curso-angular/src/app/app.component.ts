import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userName = 'Joaquim'
  title = 'curso-angular';
  constructor() { }

  ngOnInit() {
  }
}
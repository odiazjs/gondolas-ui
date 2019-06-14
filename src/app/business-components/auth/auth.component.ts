import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(
      private router: Router,
      private store: Store
  ) { }

  ngOnInit(): void { }

  onLoginResolver (result) {
    this.store.dispatch(new Navigate(['/dashboard']))
  }
    
}
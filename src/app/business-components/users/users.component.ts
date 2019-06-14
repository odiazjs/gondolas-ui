import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UsersService, User } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  users: User[];
  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit () {
    
  }
}


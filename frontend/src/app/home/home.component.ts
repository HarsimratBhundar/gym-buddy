import { Component, OnInit } from '@angular/core';
import { UserService } from '~/app/shared/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

  ngOnInit(): void {
  }

}

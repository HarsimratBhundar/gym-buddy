import { Component, OnInit } from '@angular/core';
import { UserService } from '~/app/shared/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login'])
  }

}

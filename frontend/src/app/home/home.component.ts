import { Component, OnInit } from '@angular/core';
import { UserService } from '~/app/shared/service/user.service';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { goBack } from 'tns-core-modules/ui/frame/frame';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private page: Page) {
  }

  ngOnInit(): void {
  }

}

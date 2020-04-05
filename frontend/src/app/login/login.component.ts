import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '~/app/shared/model/user.model';
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { UserService } from '~/app/shared/service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggingIn = true;
  user: User;
  password: ElementRef;
  confirmPassword: ElementRef;

  constructor(private page: Page, private userService: UserService, private router: Router) {
      this.page.actionBarHidden = true;
      this.user = new User();
  }

  toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {
      if (!this.user.username || !this.user.password) {
          this.alert("Please provide both an username address and password.");
          return;
      }

      if (this.isLoggingIn) {
          this.login();
      } else {
          this.register();
      }
  }

  login() {
      // this.userService.login(this.user)
      //     .then(() => {
      //         this.router.navigate(["/home"]);
      //     })
      //     .catch(() => {
      //         this.alert("Unfortunately we could not find your account.");
      //     });
  }

  register() {
      // if (this.password != this.confirmPassword) {
      //     this.alert("Your passwords do not match.");
      //     return;
      // }
      // this.userService.register(this.user)
      //     .then(() => {
      //         this.alert("Your account was successfully created.");
      //         this.isLoggingIn = true;
      //     })
      //     .catch(() => {
      //         this.alert("Unfortunately we were unable to create your account.");
      //     });
  }

  forgotPassword() {
      // prompt({
      //     title: "Forgot Password",
      //     message: "Enter the username address you used to register for APP NAME to reset your password.",
      //     inputType: "username",
      //     defaultText: "",
      //     okButtonText: "Ok",
      //     cancelButtonText: "Cancel"
      // }).then((data) => {
      //     if (data.result) {
      //         this.userService.resetPassword(data.text.trim())
      //             .then(() => {
      //                 this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
      //             }).catch(() => {
      //                 this.alert("Unfortunately, an error occurred resetting your password.");
      //             });
      //     }
      // });
  }

  focusPassword() {
      this.password.nativeElement.focus();
  }
  focusConfirmPassword() {
      if (!this.isLoggingIn) {
          this.confirmPassword.nativeElement.focus();
      }
  }

  alert(message: string) {
      return alert({
          title: "GYM BUDDY",
          okButtonText: "OK",
          message: message
      });
  }
}
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '~/app/shared/model/user.model';
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { UserService } from '~/app/shared/service/user.service';
import { Router } from '@angular/router';
import { take, tap, finalize } from 'rxjs/operators';


@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggingIn = true;
  user: User;
  confirmPassword: string;

  processing = false;

  constructor(private page: Page, private userService: UserService, private router: Router) {
      this.page.actionBarHidden = true;
      this.user = new User();
  }

  toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {
      if (!this.user.username || !this.user.password) {
          this.alert("Please provide valid username and password.");
          return;
      }

      if (this.isLoggingIn) {
          this.login();
      } else {
          this.register();
      }
  }

  login() {
      this.userService.login(this.user)
      .pipe(
        take(1),
        tap(() => {
            this.processing = true;
        }),
        finalize(() => {
            this.processing = false;
        }))
      .subscribe(
          (authenticated) => {
              if (authenticated) {
              this.router.navigate(["/home"]);
              }
          },
          (error) => {
            if (error.status && error.status === 404){
                this.alert("Invalid credentials");
            } else {
                throw error;
            }
          }
      );
  }

  register() {
      if (this.user.password !== this.confirmPassword) {
          this.alert("Your passwords do not match.");
          return;
      }
      this.userService.register(this.user)
      .pipe(
        take(1),
        tap(() => {
            this.processing = true;
        }),
        finalize(() => {
            this.processing = false;
        }))
      .subscribe(
        (authenticated) => {
            if (authenticated) {
            this.router.navigate(["/home"]);
            }
        },
        (error) => {
          if (error.status && error.status === 400){
              this.alert("Username has already been taken");
          } else {
              throw error;
          }
        }
    );
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

  alert(message: string) {
      return alert({
          title: "GYM BUDDY",
          okButtonText: "OK",
          message: message
      });
  }
}

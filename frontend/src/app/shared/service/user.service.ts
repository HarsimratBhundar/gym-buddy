import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { HttpClient } from "@angular/common/http";
import {
    setString,
    remove
} from "tns-core-modules/application-settings";
import { map } from 'rxjs/operators';
import { UserInfo } from "~/app/shared/model/user-info.model";

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) {
        remove("user"); // removes access token when initalized (trying to create artifical session state)
    }
    register(user: User) {
        return this.httpClient.post('/auth/register', {
            username: user.username,
            password: user.password,
        }).pipe(
            map((res) => {
                setString("user", JSON.stringify(Object.assign(res, user)));
                return true;
            })
        )
    }

    login(user: User) {
        return this.httpClient.post('/auth/login', {
            username: user.username,
            password: user.password,
        }).pipe(
            map((res) => {
                setString("user", JSON.stringify(Object.assign(res, user)));
                return true;
            })
        )
    }

    getUserInfo(user: User) {

    }

    setUserInfo(user: User, userInfo: UserInfo) {
        
    }

    logout() {
        remove("user");
    }

    resetPassword(username) {
    }

    handleErrors(error: Error) {
    }
}
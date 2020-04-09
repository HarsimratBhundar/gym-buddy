export class User {
    username: string;
    password: string;
    token: string;

    hasUsername() {
        return this.username !== '';
    }
}
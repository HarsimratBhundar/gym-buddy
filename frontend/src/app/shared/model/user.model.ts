export class User {
    username: string;
    password: string;

    hasUsername() {
        return this.username !== '';
    }
}
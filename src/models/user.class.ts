export class User {
    name: string;
    mail: any;
    password: any;

    constructor(obj?: any) {
        this.name = obj;
        this.mail = obj;
        this.password = obj;
    }

    public toJSON() {
        return {
            name: this.name,
            mail: this.mail,
            password: this.password,
        };
    }
}
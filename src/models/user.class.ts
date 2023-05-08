export class User {
    name: string;
    mail: string;

    constructor(obj?: any) {
        this.name = obj;
        this.mail = obj;
    }

    public toJSON() {
        return {
            name: this.name,
            mail: this.mail
        };
    }
}
export class User {
    name: string;
    mail: string;
    pic: string;

    constructor(obj?: any) {
        this.name = obj;
        this.mail = obj;
        this.pic = obj;
    }

    public toJSON() {
        return {
            name: this.name,
            mail: this.mail,
            pic: this.pic,
        };
    }
}
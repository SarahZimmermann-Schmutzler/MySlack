export class User {
    name: string;

    constructor(obj?: any) {
        this.name = obj;
    }

    public toJSON() {
        return {
            name: this.name
        };
    }
}
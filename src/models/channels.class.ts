export class Channels {
    name: string;
    description: string;

    constructor(obj?: any) {
        this.name = obj;
        this.description = obj;
    }

    public toJSON() {
        return {
            name: this.name,
            description: this.description
        };
    }
}
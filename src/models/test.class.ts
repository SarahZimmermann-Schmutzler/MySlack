export class Test {
    messages = [
        {
            threadText: '',
            threadDate: '',
            threadTime: ''
        }
    ]

    constructor(obj?: any) {
        this.messages = obj;
    }

    public toJSON() {
        return {
            messages: this.messages.toString()
        };
    }
}
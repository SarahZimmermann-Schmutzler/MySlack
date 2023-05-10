export class ChannelMessages {
    messages: Array<any> = [
        {
            'text': '',
        }
    ];

    constructor(obj?: any) {
        this.messages = obj;
    }

    public toJSON() {
        return {
            text: this.messages,
        };
    }
}
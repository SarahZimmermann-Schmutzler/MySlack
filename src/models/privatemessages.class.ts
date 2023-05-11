export class PrivateMessages {
    messageText: string;
    messageDate: any;
    messageTime: any;

    constructor(obj?: any) {
        this.messageText = obj;
        this.messageDate = obj;
        this.messageTime = obj;
    }

    public toJSON() {
        return {
            threadText: this.messageText,
            threadDate: this.messageDate,
            threadTime: this.messageTime
        };
    }
}
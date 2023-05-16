export class DirectMessages {
    messageWriter: string;
    messageText: string;
    messageDate: any;
    messageTime: any;

    constructor(obj?: any) {
        this.messageWriter = obj;
        this.messageText = obj;
        this.messageDate = obj;
        this.messageTime = obj;
    }

    public toJSON() {
        return {
            messageText: this.messageText,
            messageDate: this.messageDate,
            messageTime: this.messageTime,
            messageWriter: this.messageWriter,
        };
    }
}
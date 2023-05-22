export class DirectMessages {
    messageWriter: string;
    messageText: string;
    messageDate: any;
    messageTime: any;
    thisIsUser: any;
    messagePic: any;
    messageWriterId: any;

    constructor(obj?: any) {
        this.messageWriter = obj;
        this.messageText = obj;
        this.messageDate = obj;
        this.messageTime = obj;
        this.thisIsUser = obj;
        this.messagePic = obj;
        this.messageWriterId = obj;
    }

    public toJSON() {
        return {
            messageText: this.messageText,
            messageDate: this.messageDate,
            messageTime: this.messageTime,
            messageWriter: this.messageWriter,
            thisIsUser: this.thisIsUser,
            messagePic: this.messagePic,
            messageWriterId: this.messageWriterId
        };
    }
}
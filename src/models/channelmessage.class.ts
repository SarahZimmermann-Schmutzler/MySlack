export class ChannelMessages {
    threadText: string;
    threadWriter: any;
    threadDate: any;
    threadTime: any;
    thisIsUser: any;
    threadPic: any;

    constructor(obj?: any) {
        this.threadText = obj;
        this.threadWriter = obj;
        this.threadDate = obj;
        this.threadTime = obj;
        this.thisIsUser = obj;
        this.threadPic = obj;
    }

    public toJSON() {
        return {
            threadText: this.threadText,
            threadWriter: this.threadWriter,
            threadDate: this.threadDate,
            threadTime: this.threadTime,
            thisIsUser: this.thisIsUser,
            threadPic: this.threadPic
        };
    }
}
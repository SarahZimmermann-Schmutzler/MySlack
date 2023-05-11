export class ChannelMessages {
    threadText: string;
    threadWriter: any;
    threadDate: number;
    threadTime: number;

    constructor(obj?: any) {
        this.threadText = obj;
        this.threadWriter = obj;
        this.threadDate = obj;
        this.threadTime = obj;
    }

    public toJSON() {
        return {
            threadText: this.threadText,
            threadWriter: this.threadWriter,
            threadDate: this.threadDate,
            threadTime: this.threadTime
        };
    }
}
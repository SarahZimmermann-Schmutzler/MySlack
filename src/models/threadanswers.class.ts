export class ThreadAnswers {
    answerText: string;
    answerWriter: any;
    answerDate: any;
    answerTime: any;

    constructor(obj?: any) {
        this.answerText = obj;
        this.answerWriter = obj;
        this.answerDate = obj;
        this.answerTime = obj;
    }

    public toJSON() {
        return {
            threadText: this.answerText,
            threadWriter: this.answerWriter,
            threadDate: this.answerDate,
            threadTime: this.answerTime
        };
    }
}
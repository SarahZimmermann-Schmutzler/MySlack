export class ThreadAnswers {
    answerText: string;
    answerWriter: any;
    answerDate: any;
    answerTime: any;
    thisIsUser: any;

    constructor(obj?: any) {
        this.answerText = obj;
        this.answerWriter = obj;
        this.answerDate = obj;
        this.answerTime = obj;
        this.thisIsUser = obj;
    }

    public toJSON() {
        return {
            answerText: this.answerText,
            answerWriter: this.answerWriter,
            answerDate: this.answerDate,
            answerTime: this.answerTime,
            thisIsUser: this.thisIsUser
        };
    }
}
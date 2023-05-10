export class ChannelMessages {
    messages: Array<any> = [
        {
            'thread': 'Wer kommt mit Baden?',
            'userId': '1234',
            'timestamp': '12:30',
            'date': 'Mittwoch, 10. Mai',
            // 'answers': [
            //     {
            //         'answer': 'Ich komme mit',
            //         'userId': '5678',
            //         'timestamp': '12:40'
            //     }
            // ]
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
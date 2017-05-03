export class ChatMessage {
    img: string;
    senderName: string;
    message: string;
    date: any;
    position: string;

    constructor(senderName: string, message: string, date: any, position: string, img: string) {
        this.senderName = senderName;
        this.message = message;
        this.date = date;
        this.position = position;
        this.img = img;
    };
};
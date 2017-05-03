export class User {
    id: number;
    name: string;
    email: string;
    profileImageUrl: string;

    constructor(id: number, name: string, email: string, profileImageUrl: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
    };
};
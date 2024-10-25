export interface IUserEntity {
    _id: string;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserEntity {
    _id: string;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

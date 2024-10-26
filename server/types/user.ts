export interface IUserEntity {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserDocument extends IUserEntity {
    _doc: IUserEntity;
}

export interface IUserEntity {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserDocument extends IUserEntity {
    _doc: IUserEntity;
}

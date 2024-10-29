export interface ICommentEntity {
    postId: string;
    userId: string;
    content: string;
    likes: string[];
    numberOfLikes: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface ICommentDocument extends ICommentEntity {
    _data: ICommentEntity;
}

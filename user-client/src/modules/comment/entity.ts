export interface ICommentEntity {
    _id: string;
    postId: string;
    userId: string;
    content: string;
    likes: string[];
    numberOfLikes: number;
    createdAt: Date;
    updatedAt: Date;
}

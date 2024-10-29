import { IPostEntity } from '~modules/post';
import { IUserEntity } from '~modules/user';

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
interface ICommentPopulate extends ICommentEntity {
    post: IPostEntity;
    user: IUserEntity;
}
export interface ICommentListData {
    comments: ICommentPopulate[];
    total: number;
    lastMonthComments: number;
}

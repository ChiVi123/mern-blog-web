export interface IPostEntity {
    _id: string;
    userId: string;
    content: string;
    title: string;
    image: string;
    category: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}
export type PostListDataType = {
    posts: IPostEntity[];
    total: number;
    lastMonthPosts: number;
};

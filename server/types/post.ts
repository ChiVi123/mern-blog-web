export interface IPostEntity {
    userId: string;
    content: string;
    title: string;
    image: string;
    category: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IPostDocument extends IPostEntity {
    _doc: IPostEntity;
}

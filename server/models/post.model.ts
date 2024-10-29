import mongoose from "mongoose";
import { IPostDocument } from "~types";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default:
                "https://firebasestorage.googleapis.com/v0/b/mern-blog-69ecb.appspot.com/o/thumbnail-post-placeholder.png?alt=media&token=d30cc426-abcc-41d6-8131-b2c09244b588",
        },
        category: {
            type: String,
            default: "uncategorized",
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model<IPostDocument>("Post", postSchema);

export default Post;

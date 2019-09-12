import { Schema } from 'mongoose';

export const SiteSchema = new Schema({
    id: String,
    lang: String,
    content: {
        header: String,
        subHeader: String,
        tagLine: String,
        logoImage: String,
        logoUrl: String,
        comments: Array,
        media: Array,
        menus: [
            {
                name: String,
                elements: [
                    {
                        code: String,
                        name: String,
                        pos: Number,
                    },
                ],
            },
        ],
        posts: Array,
        pages: [
            {
                group: String,
                id: String,
                title: String,
                content: String,
            },
        ],
        users: Array,
        custom: [
            {
                name: String,
                content: String,
            },
        ],
    },
});

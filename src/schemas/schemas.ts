// interface SiteSchemaI {
//     content: {
//         title: string;
//         author: string;
//         body: string;
//         comments: [{ body: String; date: Date }];
//         date: { type: Date; default: Date.now };
//         hidden: Boolean;
//         meta: {
//             votes: Number;
//             favs: Number;
//         };
//     };
// }

import { Schema } from 'mongoose';

export const SiteSchema = new Schema({
    content: {
        id: String,
        lang: String,
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

export interface MediaItemI {
    location: string;
    elements: string[];
}

export interface SiteSchemaI {
    content: {
        id: string;
        lang: string;
        header: string;
        subHeader: string;
        tagLine: string;
        logoImage: string;
        logoUrl: string;
        comments: string[];
        media: MediaItemI[];
        menus: [
            {
                name: string;
                elements: [
                    {
                        code: string;
                        name: string;
                        pos: number;
                    }
                ];
            }
        ];
        posts: object[];
        pages: [
            {
                group: string;
                id: string;
                title: string;
                content: string;
            }
        ];
        users: object[];
        custom: [
            {
                name: string;
                content: string;
            }
        ];
    };
}

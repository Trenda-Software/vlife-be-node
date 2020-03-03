import { Model } from 'sequelize';

export interface DBModelsI {
    country: Model | null;
    province: Model | null;
    specialty: Model | null;
    professional: Model | null;
    practice: Model | null;
    user: Model | null;
    comment: Model | null;
    request: Model | null;
    ImgPrescription: Model | null;
    gender: Model | null;
}

export interface MenuI {
    name: string;
    elements: MenuIitemI[];
}

export interface MenuIitemI {
    code: string;
    name: string;
    pos: number;
}

export interface PostI {
    name: string;
}

export interface PageI {
    group: string;
    id: string;
    title: string;
    content: string;
}

export interface UserI {
    name: string;
    surname: string;
    pwd: string;
    coordinates: string;
    picture: string;
    email: string;
    mobile: string;
    city: string;
    address: string;
}
export interface CustomI {
    name: string;
    content: string;
}

export interface CommentI {
    name: string;
    content: string;
}

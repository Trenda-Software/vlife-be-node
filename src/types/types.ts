import { Model } from 'sequelize';

export interface DBModelsI {
    usuario: Model | null;
    pais: Model | null;
    provincia: Model | null;
    especialidad: Model | null;
    especialidad2: Model | null;
    profesional: Model | null;
    profesionalespecialidad: Model | null;
    practica: Model | null;
}

export interface UsuarioI {
    nombre: string;
    clave: string;
    coordenadas: string;
    apellido: string;
    foto: string;
    mail: string;
    celular: string;
    ciudad: string;
    direccion: string;
    associate: any;
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
}
export interface CustomI {
    name: string;
    content: string;
}

export interface CommentI {
    name: string;
    content: string;
}

// export interface SiteSchemaI {
//     id: string;
//     lang: string;
//     content: {
//         header: string;
//         subHeader: string;
//         tagLine: string;
//         logoImage: string;
//         logoUrl: string;
//         comments: CommentI[];
//         media: MediaItemI[];
//         menus: MenuI[];
//         posts: PostI[];
//         pages: PageI[];
//         users: UserI[];
//         custom: CustomI[];
//     };
// }

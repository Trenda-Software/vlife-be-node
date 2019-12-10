'use strict';

import { generateKeyPairSync } from 'crypto';

// import { UsuarioI } from '../../types/types';
import Sequelize from 'sequelize';

module.exports = (sequelize: any) => {
    const Usuario = sequelize.define(
        'Usuarios',
        {
            idUsuario: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            nombre: Sequelize.STRING,
            clave: Sequelize.STRING,
            coordenadas: Sequelize.STRING,
            apellido: Sequelize.STRING,
            foto: Sequelize.STRING,
            mail: Sequelize.STRING,
            celular: Sequelize.STRING,
            ciudad: Sequelize.STRING,
            direccion: Sequelize.STRING,
        },
        { timestamps: false }
    );

    Usuario.associate = (models: any) => {
        Usuario.belongsTo(models.Pais, {
            foreignKey: {
                name: 'idPais',
                allowNull: false,
            },
        });
    };

    return Usuario;
};

// const Model = Sequelize.Model;

// class User extends Model {}

// User.init(
//     {
//         // attributes
//         firstName: {
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         lastName: {
//             type: Sequelize.STRING,
//             // allowNull defaults to true
//         },
//     },
//     {
//         sequelize,
//         modelName: 'user',
//         // options
//     }
// );

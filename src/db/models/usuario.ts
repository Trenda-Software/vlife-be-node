'use strict';
import { UsuarioI } from '../../types/types';
import Sequelize from 'sequelize';

// module.exports = (sequelize: any, DataTypes: any) => {
//     const Usuario: UsuarioI = sequelize.define(
//         'Usuarios',
//         {
//             nombre: DataTypes.STRING,
//             clave: DataTypes.STRING,
//             coordenadas: DataTypes.STRING,
//             apellido: DataTypes.STRING,
//             foto: DataTypes.STRING,
//             mail: DataTypes.STRING,
//             celular: DataTypes.STRING,
//             ciudad: DataTypes.STRING,
//             direccion: DataTypes.STRING,
//         },
//         {}
//     );
//     Usuario.associate = function(models) {
//         // associations can be defined here
//         // @ManyToOne
//         // @JoinColumn(name = "IdPais")
//         // Pais pais;
//         // @ManyToOne
//         // @JoinColumn(name = "IdProvincias")
//         // Provincia provincia;
//     };
//     return Usuario;
// };

const Model = Sequelize.Model;

class User extends Model {}

User.init(
    {
        // attributes
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            // allowNull defaults to true
        },
    },
    {
        sequelize,
        modelName: 'user',
        // options
    }
);

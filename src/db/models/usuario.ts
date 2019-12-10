import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const UsuarioModel = (sequelize: any) => {
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
            idPais: Sequelize.INTEGER,
            idProvincia: Sequelize.INTEGER,
        },
        { timestamps: false }
    );

    Usuario.associate = (models: DBModelsI) => {
        Usuario.belongsTo(models.pais, {
            foreignKey: {
                name: 'idPais',
                allowNull: false,
            },
        });
        Usuario.belongsTo(models.provincia, {
            foreignKey: {
                name: 'idProvincia',
                allowNull: false,
            },
        });
    };

    return Usuario;
};

export default UsuarioModel;

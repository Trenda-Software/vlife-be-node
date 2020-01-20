import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const PaisModel = (sequelize: any) => {
    const Pais = sequelize.define(
        'pais',
        {
            idpais: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: Sequelize.STRING,
            codigo: Sequelize.STRING,
        },
        {
            timestamps: false,
            tableName: 'pais',
            // Aliases for joins
            name: {
                singular: 'pais',
                plural: 'paises',
            },
        }
    );

    Pais.associate = (models: DBModelsI) => {
        Pais.hasMany(models.usuario);
    };

    return Pais;
};

export default PaisModel;

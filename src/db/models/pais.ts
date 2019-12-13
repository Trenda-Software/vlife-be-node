import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const PaisModel = (sequelize: any) => {
    const Pais = sequelize.define(
        'Pais',
        {
            idPais: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: Sequelize.STRING,
            codigo: Sequelize.STRING,
        },
        {
            timestamps: false,
            tableName: 'Pais',
            // Aliases for joins
            name: {
                singular: 'Pais',
                plural: 'Paises',
            },
        }
    );

    Pais.associate = (models: DBModelsI) => {
        Pais.hasMany(models.usuario);
    };

    return Pais;
};

export default PaisModel;

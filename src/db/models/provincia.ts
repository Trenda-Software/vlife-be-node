import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const ProvinciaModel = (sequelize: any) => {
    const Provincia = sequelize.define(
        'Provincia',
        {
            idProvincia: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: Sequelize.STRING,
            codigo: Sequelize.STRING,
        },
        {
            timestamps: false,
            tableName: 'provincia',
            // Aliases for joins
            name: {
                singular: 'Provincia',
                plural: 'Provincias',
            },
        }
    );

    Provincia.associate = (models: DBModelsI) => {
        Provincia.hasMany(models.usuario);
    };

    return Provincia;
};

export default ProvinciaModel;

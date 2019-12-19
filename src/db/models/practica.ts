import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const PracticaModel = (sequelize: any) => {
    const Practica = sequelize.define(
        'Practica',
        {
            idPractica: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            codigo: Sequelize.STRING,
            practica: Sequelize.STRING,
            IdEspecialidad: Sequelize.INTEGER,
            Precio: Sequelize.DOUBLE,
        },
        {
            timestamps: false,
            tableName: 'Practica',
            // Aliases for joins
            name: {
                singular: 'Practica',
                plural: 'Practicas',
            },
        }
    );

    Practica.associate = (models: DBModelsI) => {
        Practica.belongsTo(models.especialidad, {
            foreignKey: {
                name: 'idEspecialidad',
                allowNull: false,
            },
        });
    };

    return Practica;
};

export default PracticaModel;

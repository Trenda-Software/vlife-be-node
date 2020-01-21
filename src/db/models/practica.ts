import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const PracticaModel = (sequelize: any) => {
    const Practica = sequelize.define(
        'practica',
        {
            idpractica: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            codigo: Sequelize.STRING,
            practica: Sequelize.STRING,
            idespecialidad: Sequelize.INTEGER,
            precio: Sequelize.DOUBLE,
        },
        {
            timestamps: false,
            tableName: 'practica',
            // Aliases for joins
            name: {
                singular: 'practica',
                plural: 'practicas',
            },
        }
    );

    Practica.associate = (models: DBModelsI) => {
        Practica.belongsTo(models.especialidad, {
            foreignKey: {
                name: 'idespecialidad',
                allowNull: false,
            },
        });
    };

    return Practica;
};

export default PracticaModel;

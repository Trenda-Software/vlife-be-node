import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const EspecialidadModel = (sequelize: any) => {
    const Especialidad = sequelize.define(
        'Especialidad',
        {
            IdEspecialidad: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Especialidad: Sequelize.STRING,
            Codigo: Sequelize.STRING,
        },
        {
            timestamps: false,
            tableName: 'Especialidad',
            // Aliases for joins
            name: {
                singular: 'Especialidad',
                plural: 'Especialidades',
            },
        }
    );

    Especialidad.associate = (models: DBModelsI) => {
        Especialidad.hasMany(models.profesional, {
            through: 'ProfesionalEspecialidad',
            as: 'Profesionales',
            foreignKey: 'IdEspecialidad'
        });
    };

    return Especialidad;
};

export default EspecialidadModel;

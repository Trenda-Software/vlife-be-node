import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const ProfesionalEspecialidadModel = (sequelize: any) => {
    const ProfesionalEspecialidad = sequelize.define(
        'ProfesionalEspecialidad',
        {
            IdProfesionalEspecialidad: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            IdProfesional: Sequelize.INTEGER,
            IdEspecialidad: Sequelize.INTEGER,
        },
        {
            timestamps: false,
            tableName: 'ProfesionalEspecialidad',
            // Aliases for joins
            name: {
                singular: 'ProfesionalEspecialidad',
                plural: 'ProfesionalEspecialidades',
            },
        }
    )

    return ProfesionalEspecialidad;

};

export default ProfesionalEspecialidadModel;

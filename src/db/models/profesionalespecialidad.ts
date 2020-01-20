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
            tableName: 'profesionalespecialidad',
            // Aliases for joins
            name: {
                singular: 'ProfesionalEspecialidad',
                plural: 'ProfesionalEspecialidades',
            },
        }
    );

    ProfesionalEspecialidad.associate = (models: DBModelsI) => {
        ProfesionalEspecialidad.belongsTo(models.profesional, {
            foreignKey: {
                name: 'IdProfesional',
                allowNull: false,
            },
        });
        ProfesionalEspecialidad.belongsTo(models.especialidad, {
            foreignKey: {
                name: 'IdEspecialidad',
                allowNull: false,
            },
        });
    };

    return ProfesionalEspecialidad;
};

export default ProfesionalEspecialidadModel;

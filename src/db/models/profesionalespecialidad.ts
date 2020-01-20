import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const ProfesionalEspecialidadModel = (sequelize: any) => {
    const ProfesionalEspecialidad = sequelize.define(
        'profesionalespecialidad',
        {
            idprofesionalespecialidad: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            idprofesional: Sequelize.INTEGER,
            idespecialidad: Sequelize.INTEGER,
        },
        {
            timestamps: false,
            tableName: 'profesionalespecialidad',
            // Aliases for joins
            name: {
                singular: 'profesionalespecialidad',
                plural: 'profesionalespecialidades',
            },
        }
    );

    ProfesionalEspecialidad.associate = (models: DBModelsI) => {
        ProfesionalEspecialidad.belongsTo(models.profesional, {
            foreignKey: {
                name: 'idprofesional',
                allowNull: false,
            },
        });
        ProfesionalEspecialidad.belongsTo(models.especialidad, {
            foreignKey: {
                name: 'idespecialidad',
                allowNull: false,
            },
        });
    };

    return ProfesionalEspecialidad;
};

export default ProfesionalEspecialidadModel;

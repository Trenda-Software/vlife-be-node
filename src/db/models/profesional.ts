import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const ProfesionalModel = (sequelize: any) => {
    const Profesional = sequelize.define(
        'Profesional',
        {
            IdProfesional: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Codigo: Sequelize.STRING,
            Nombre: Sequelize.STRING,
        },
        {
            timestamps: false,
            tableName: 'Profesional',
            // Aliases for joins
            name: {
                singular: 'Profesional',
                plural: 'Profesionales',
            },
        }
    );

    Profesional.associate = (models: DBModelsI) => {
        //Profesional.belongsTo(models.especialidad, {
        //    through: 'ProfesionalEspecialidad',
        //    as: 'Especialidades',
        //    foreignKey: 'IdProfesional'
        //});

        Profesional.associate = (models: DBModelsI) => {
            Profesional.hasMany(models.profesionalespecialidad);
        };

    };

    return Profesional;
};

export default ProfesionalModel;

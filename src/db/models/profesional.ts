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
        Profesional.hasMany(models.especialidad);
    };

    return Profesional;
};

export default ProfesionalModel;

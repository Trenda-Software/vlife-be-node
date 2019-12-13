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
        Profesional.belongstomany(models.especialidad, {
            through: 'ProfesionalEspecialidad',
            as: 'Especialidades',
            foreignKey: 'IdProfesional'
        });
    };

    return Profesional;
};

export default ProfesionalModel;

import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const ProfesionalModel = (sequelize: any) => {
    const Profesional = sequelize.define(
        'profesional',
        {
            idprofesional: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            codigo: Sequelize.STRING,
            nombre: Sequelize.STRING,
        },
        {
            timestamps: false,
            tableName: 'profesional',
            // Aliases for joins
            name: {
                singular: 'profesional',
                plural: 'profesionales',
            },
        }
    );

    Profesional.associate = (models: DBModelsI) => {
        //Profesional.belongsTo(models.especialidad, {
        //    through: 'profesionalespecialidad',
        //    as: 'especialidades',
        //    foreignKey: 'idprofesional'
        //});

        Profesional.associate = (models: DBModelsI) => {
            Profesional.hasMany(models.profesionalespecialidad);
        };

    };

    return Profesional;
};

export default ProfesionalModel;

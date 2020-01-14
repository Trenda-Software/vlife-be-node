import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const EspecialidadModel = (sequelize: any) => {
    const Especialidad = sequelize.define(
        'especialidad',
        {
            Idespecialidad: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            especialidad: Sequelize.STRING,
            codigo: Sequelize.STRING,
        },
        {
            timestamps: false,
            tableName: 'especialidad',
            // Aliases for joins
            name: {
                singular: 'especialidad',
                plural: 'especialidades',
            },
        }
    );

    Especialidad.associate = (models: DBModelsI) => {
        Especialidad.hasMany(models.profesionalespecialidad);
    };

    return Especialidad;
};

export default EspecialidadModel;

import Sequelize from 'sequelize';
import { DBModelsI } from '../../types/types';

const EspecialidadModel = (sequelize: any) => {
    const Especialidad = sequelize.define(
        'Especialidad',
        {
            idEspecialidad: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            especialidad: Sequelize.STRING,
            codigo: Sequelize.STRING,
            cantprofesionales: Sequelize.INTEGER,
        },
        { timestamps: false, tableName: 'V_especialidad' }
    );

    Especialidad.associate = (models: DBModelsI) => {
        Especialidad.hasMany(models.practica);
    };
    return Especialidad;
};

export default EspecialidadModel;

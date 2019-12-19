import Sequelize from 'sequelize';

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

    return Especialidad;
};

export default EspecialidadModel;

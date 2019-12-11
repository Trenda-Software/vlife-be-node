import Sequelize from 'sequelize';

const EspecialidadViewModel = (sequelize: any) => {
    const EspecialidadView = sequelize.define(
        'EspecialidadView',
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

    return EspecialidadView;
};

export default EspecialidadViewModel;

import Sequelize from 'sequelize';

const EspecialidadViewModel = (sequelize: any) => {
    const EspecialidadView = sequelize.define(
        'V_especialidad',
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
        { timestamps: false }
    );

    return EspecialidadView;
};

export default EspecialidadViewModel;

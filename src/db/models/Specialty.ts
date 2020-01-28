import Sequelize from 'sequelize';

const SpecialtyModel = (sequelize: any) => {
    const Specialty = sequelize.define('Specialty', {
        code: Sequelize.STRING,
        name: Sequelize.STRING,
    });

    return Specialty;
};

export default SpecialtyModel;

import Sequelize from 'sequelize';

const SpecialtyModel = (sequelize: any) => {
    const Specialty = sequelize.define('Specialty', {
        name: Sequelize.STRING,
        code: Sequelize.STRING,
    });

    return Specialty;
};

export default SpecialtyModel;

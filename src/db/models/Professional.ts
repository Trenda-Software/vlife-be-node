import Sequelize from 'sequelize';

const ProfessionalModel = (sequelize: any) => {
    const Professional = sequelize.define('Professional', {
        code: Sequelize.STRING,
        name: Sequelize.STRING,
    });

    return Professional;
};

export default ProfessionalModel;

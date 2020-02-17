import Sequelize from 'sequelize';

const ProfessionalModel = (sequelize: any) => {
    const Professional = sequelize.define('Professional', {
        code: Sequelize.STRING,
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        mobile: Sequelize.STRING,
        email: Sequelize.STRING,
        coordinates: Sequelize.STRING,
        address: Sequelize.STRING,
        city: Sequelize.STRING,
        picture: Sequelize.BLOB,
        rating: Sequelize.INTEGER,
        description: Sequelize.STRING,
    });

    return Professional;
};

export default ProfessionalModel;

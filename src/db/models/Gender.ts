import Sequelize from 'sequelize';

const GenderModel = (sequelize: any) => {
    const Gender = sequelize.define('Gender', {
        code: Sequelize.STRING,
        name: Sequelize.STRING,
    });

    return Gender;
};

export default GenderModel;

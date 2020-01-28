import Sequelize from 'sequelize';

const ProvinceModel = (sequelize: any) => {
    const Province = sequelize.define('Province', {
        code: Sequelize.STRING,
        name: Sequelize.STRING,
    });

    return Province;
};

export default ProvinceModel;

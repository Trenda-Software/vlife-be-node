import Sequelize from 'sequelize';

const CountryModel = (sequelize: any) => {
    const Country = sequelize.define('Country', {
        code: Sequelize.STRING,
        name: Sequelize.STRING,
    });

    return Country;
};

export default CountryModel;

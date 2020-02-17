import Sequelize from 'sequelize';
//User model
const UserModel = (sequelize: any) => {
    const User = sequelize.define('User', {
        dni: Sequelize.STRING,
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        pwd: Sequelize.STRING,
        coordinates: Sequelize.STRING,
        picture: Sequelize.BLOB,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mobile: Sequelize.STRING,
        city: Sequelize.STRING,
        address: Sequelize.STRING,
    });

    return User;
};

export default UserModel;

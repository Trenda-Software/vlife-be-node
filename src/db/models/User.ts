import Sequelize from 'sequelize';
//User model WTF
const UserModel = (sequelize: any) => {
    const User = sequelize.define('User', {
        dni: Sequelize.STRING,
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        pwd: Sequelize.STRING,
        lat: Sequelize.STRING,
        lng: Sequelize.STRING,
        picture: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mobile: Sequelize.STRING,
        city: Sequelize.STRING,
        address: Sequelize.STRING,
        fcmtoken: Sequelize.STRING,
    });

    return User;
};

export default UserModel;

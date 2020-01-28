import Sequelize from 'sequelize';

const ProfileModel = (sequelize: any) => {
    const Profile = sequelize.define(
        'profile',
        {
            idProfile: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: Sequelize.STRING,
        },
        { tableName: 'profile' }
    );

    return Profile;
};

export default ProfileModel;

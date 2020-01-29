import Sequelize from 'sequelize';

const ProfileModel = (sequelize: any) => {
    const Profile = sequelize.define('Profile', {
        name: Sequelize.STRING,
    });

    return Profile;
};

export default ProfileModel;

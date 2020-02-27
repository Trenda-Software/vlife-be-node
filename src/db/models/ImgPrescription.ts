import Sequelize from 'sequelize';
//User model
const ImgPescriptionModel = (sequelize: any) => {
    const ImgPescription = sequelize.define('ImgPescription', {
        picture: Sequelize.BLOB,
    });

    return ImgPescription;
};

export default ImgPescriptionModel;

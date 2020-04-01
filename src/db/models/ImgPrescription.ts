import Sequelize from 'sequelize';
//User model
const ImgPrescriptionModel = (sequelize: any) => {
    const ImgPrescription = sequelize.define('ImgPrescription', {
        picture: Sequelize.STRING,
    });

    return ImgPrescription;
};

export default ImgPrescriptionModel;

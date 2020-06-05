import Sequelize from 'sequelize';

const ProfessionalModel = (sequelize: any) => {
    const Professional = sequelize.define('Professional', {
        code: Sequelize.STRING,
        dni: Sequelize.STRING,
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        pwd: Sequelize.STRING,
        mobile: Sequelize.STRING,
        email: Sequelize.STRING,
        lat: Sequelize.STRING,
        lng: Sequelize.STRING,
        address: Sequelize.STRING,
        city: Sequelize.STRING,
        picture: Sequelize.STRING,
        rating: Sequelize.INTEGER,
        description: Sequelize.STRING,
        in_service: Sequelize.BOOLEAN,
        on_line: Sequelize.BOOLEAN,
        fcmtoken: Sequelize.STRING,
        comvlife: Sequelize.DOUBLE(11, 10),
        certpicture: Sequelize.STRING,
        certnumber: Sequelize.STRING,
        paymethod: Sequelize.INTEGER,
        cbu: Sequelize.STRING,
        recoverycode: Sequelize.STRING,
        approved: Sequelize.INTEGER,

    });
    /*
    approved
    -0 si la cuenta todavia esta pendiente de revision (de la foto de matricula)
    -1 si fue rechazada
    -2 si fue aceptada
    */
    return Professional;
};

export default ProfessionalModel;

import Sequelize from 'sequelize';
//Profile model WTF
const PatienttypeModel = (sequelize: any) => {
    const Patienttype = sequelize.define('Patienttype', {
        name: Sequelize.STRING,
    });

    return Patienttype;
};

export default PatienttypeModel;

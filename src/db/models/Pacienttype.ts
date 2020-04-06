import Sequelize from 'sequelize';
//Profile model WTF
const PacienttypeModel = (sequelize: any) => {
    const Pacienttype = sequelize.define('Pacienttype', {
        name: Sequelize.STRING,
    });

    return Pacienttype;
};

export default PacienttypeModel;

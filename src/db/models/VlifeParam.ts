import Sequelize from 'sequelize';

const VlifeParamModel = (sequelize: any) => {
    const VlifeParam = sequelize.define('VlifeParam', {
        comvlifeprof: Sequelize.DECIMAL(11, 2),
        plusxdistancia: Sequelize.DECIMAL(11, 2),
        plusxhorario: Sequelize.DECIMAL(11, 2),
        distanciaplus: Sequelize.INTEGER,
    });

    return VlifeParam;
};

export default VlifeParamModel;

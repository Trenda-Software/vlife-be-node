import Sequelize from 'sequelize';

const RequestModel = (sequelize: any) => {
    const Request = sequelize.define('Request', {
        commentusr: Sequelize.STRING,
        commentprof: Sequelize.STRING,
        date: Sequelize.DATE,
        approve: Sequelize.BOOLEAN,
    });

    return Request;
};

export default RequestModel;

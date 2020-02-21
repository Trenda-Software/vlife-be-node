import Sequelize from 'sequelize';

const RequestModel = (sequelize: any) => {
    const Request = sequelize.define('Request', {
        comment: Sequelize.STRING,
        date: Sequelize.DATE,
    });

    return Request;
};

export default RequestModel;

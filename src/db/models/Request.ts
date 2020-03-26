import Sequelize from 'sequelize';

const RequestModel = (sequelize: any) => {
    const Request = sequelize.define('Request', {
        commentusr: Sequelize.STRING,
        commentprof: Sequelize.STRING,
        date: Sequelize.DATE,
        approve: Sequelize.BOOLEAN,
        staterequest: Sequelize.INTEGER,
    });

    /*
     StateRequest
     0 = Solicitud creada
     1 = Solicitud Rechazada
     2 = Solicitud Aprobada
     3 = Solicitud Finalizada
    */

    return Request;
};

export default RequestModel;

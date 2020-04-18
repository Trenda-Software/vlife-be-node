import Sequelize from 'sequelize';

const RequestModel = (sequelize: any) => {
    const Request = sequelize.define('Request', {
        commentusr: Sequelize.STRING,
        commentprof: Sequelize.STRING,
        date: Sequelize.DATE,
        approve: Sequelize.BOOLEAN,
        staterequest: Sequelize.INTEGER,
        satisfied: Sequelize.BOOLEAN,
    });

    /*
     StateRequest
     0 = Solicitud creada
     1 = Solicitud Rechazada
     2 = Solicitud Aprobada
     3 = Solicitud Finalizada x el profesioanl
     4 = Solicitud Cancelada por el usuario
     5 = Solicitud con Pago Confirmado x el usuario 
     6 = Solicitud Cancelada por el profesional
     7 = Solicitud Finalizada x el usuario
     8 = Solicitud Cancelada por logout profesional
     9 = Solicitud Cancelada porque el profesional no contesto despues de 15min
    */



    return Request;
};

export default RequestModel;

import Sequelize from 'sequelize';

const RequestModel = (sequelize: any) => {
    const Request = sequelize.define('Request', {
        commentusr: Sequelize.STRING,
        commentprof: Sequelize.STRING,
        date: Sequelize.DATE,
        approve: Sequelize.BOOLEAN,
        staterequest: Sequelize.INTEGER,
        satisfied: Sequelize.BOOLEAN,
        preferenceid: Sequelize.STRING,
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
     10 = Solicitud Cancelada por falta de pago del usr despues de 15min
     11 = Solicitud Cancelada por el usuario y la misma tenia anteriormente estado 0
    */



    return Request;
};

export default RequestModel;

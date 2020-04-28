
const { Sequelize } = require('sequelize');
var FCM = require('fcm-push');

module.exports = function (interval: any, dbClient: any) {

    setInterval(async () => {
        console.log('-------------------------------------------------------');
        console.log('Cancelacion de los Request que no tuvieron respuesta x min ' + process.env.CANCEL_REQUEST_MINUTES);
        const requests = await dbClient.query("update Requests set commentprof = 'Cancelado por no respuesta del profesional',staterequest=9 where (timestampdiff(minute,  Requests.updatedAt,now() ) > " + process.env.CANCEL_REQUEST_MINUTES + " )  and staterequest = 0 and id <> -1", { type: Sequelize.QueryTypes.UPDATE });
        console.log('request ' + JSON.stringify(requests));
        console.log('-------------------------------------------------------');

        console.log('-------------------------------------------------------');
        console.log('Cancelacion de los Request que no fueron pogados x el usuario x min ' + process.env.CANCEL_REQUEST_MINUTES);
        const cancelRequests = await dbClient.query("select Requests.id as RequestId, Professionals.id as profid, Professionals.fcmtoken as proffcmtoken, Professionals.picture as profpicture,Professionals.name as profname, Professionals.surname as profsurname, users.id as usrid, users.fcmtoken as usrfcmtoken, users.picture as usrpicture, users.name as usrname, users.surname as usrsurname from Requests inner join professionals on professionals.id = Requests.ProfessionalId inner join users on users.id = Requests.UserId where (timestampdiff(minute,  Requests.updatedAt,now() ) > " + process.env.CANCEL_REQUEST_MINUTES + " )  and staterequest = 2 and Requests.id <> -1", { type: Sequelize.QueryTypes.SELECT });
        for (let cancelRequest in cancelRequests) {
            // Envio de notificacion push al profesional

            var serverKey = process.env.PROF_SERVER_KEY;

            console.log("Seteo el token prof" + cancelRequests[cancelRequest].proffcmtoken);
            var token = cancelRequests[cancelRequest].proffcmtoken;
            var color = "#194876"
            var strImagen = cancelRequests[cancelRequest].usrpicture;
            var strUser = cancelRequests[cancelRequest].usrname + " " + cancelRequests[cancelRequest].usrsurname

            var fcm = new FCM(serverKey);

            var message = {
                to: token,
                notification: {
                    title: "Solicitud cancelada por falta de pago",
                    icon: "icon",
                    color: color
                },
                collapse_key: '',
                data: { // Esto es solo opcional, puede enviar cualquier dato     
                    status: 10,
                    requestID: cancelRequests[cancelRequest].RequestId,
                    title: "Solicitud cancelada por falta de pago",
                    image: strImagen
                },
                body: {
                    title: strUser + " - Solicitud cancelada por falta de pago",
                    body: "Hola!",
                    image: strImagen,
                    icon: "Notificación",
                    sound: "default"
                },
            };

            console.log("msg PN " + JSON.stringify(message));
            fcm.send(message, function (err: any, response: any) {
                if (err) {
                    console.log("error encontrado ", JSON.stringify(err));
                } else {
                    console.log("respuesta aquí", JSON.stringify(response));
                }
            });
            // Envio de notificacion push al usuario

            serverKey = process.env.USR_SERVER_KEY;

            console.log("Seteo el token usr" + cancelRequests[cancelRequest].usrfcmtoken);
            token = cancelRequests[cancelRequest].usrfcmtoken;
            color = "#197476"
            strImagen = cancelRequests[cancelRequest].usrpicture;
            strUser = cancelRequests[cancelRequest].usrname + " " + cancelRequests[cancelRequest].usrsurname

            message = {
                to: token,
                notification: {
                    title: "Solicitud cancelada por falta de pago",
                    icon: "icon",
                    color: color
                },
                collapse_key: '',
                data: { // Esto es solo opcional, puede enviar cualquier dato     
                    status: 10,
                    requestID: cancelRequests[cancelRequest].RequestId,
                    title: "Solicitud cancelada por falta de pago",
                    image: strImagen
                },
                body: {
                    title: strUser + " - Solicitud cancelada por falta de pago",
                    body: "Hola!",
                    image: strImagen,
                    icon: "Notificación",
                    sound: "default"
                },
            };

            console.log("msg PN " + JSON.stringify(message));
            fcm.send(message, function (err: any, response: any) {
                if (err) {
                    console.log("error encontrado ", JSON.stringify(err));
                } else {
                    console.log("respuesta aquí", JSON.stringify(response));
                }
            });
        }
        const updateRequests = await dbClient.query("update Requests set commentprof = 'Solicitud cancelada por falta de pago', commentusr = 'Solicitud cancelada por falta de pago',staterequest=10 where (timestampdiff(minute,  Requests.updatedAt,now() ) > " + process.env.CANCEL_REQUEST_MINUTES + " )  and staterequest = 2 and id <> -1", { type: Sequelize.QueryTypes.UPDATE });
        console.log('requests x falta de pago ' + JSON.stringify(updateRequests));
        console.log('-------------------------------------------------------');

    }, interval) // se ejecuta cada 5 minutos
}
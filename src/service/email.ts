const nodemailer = require("nodemailer");

class Email {
    createTransport: any = null;
    constructor(oConfig: any) {
        this.createTransport = nodemailer.createTransport(oConfig);
    }

    enviarCorreo(oEmail: any) {
        try {
            this.createTransport.sendMail(oEmail, function (error: any, info: any) {
                if (error) {
                    console.log("Error al enviar email");
                } else {
                    console.log("Correo enviado correctamente");
                }

            });
            this.createTransport.close();
        } catch (x) {
            console.log("Email.enviarCorreo -- Error-- " + x);
        }
    }
}
module.exports = Email;
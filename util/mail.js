var nodemailer = require("nodemailer");
var directtransport = require('nodemailer-direct-transport');

exports.send = function(namesurname, email, phone, message, next){  
    var mail = {
        from: "mario@mjuez.com",
        to: "mario@mjuez.com",
        subject: "[CONTACTO WEB] " + namesurname,
        text:   "Nombre y apellidos: " + namesurname + "\n" +
                "Correo: "  + email + "\n" +
                "Telefono: " + phone + "\n" +
                "Mensaje: " + message,
        html:   "<strong>Nombre y apellidos:</strong> " + namesurname + "<br />" +
                "<strong>Correo:</strong> "  + email + "<br />" +
                "<strong>Telefono:</strong> " + phone + "<br />" +
                "<strong>Mensaje:</strong> " + message,
    };

    var transport = nodemailer.createTransport(directtransport({
        name: 'mail.mjuez.com'
    }));
    
    transport.sendMail(mail, function(error, info){
        if(error){
            next(false);
        }else{
            next(true);
        }
    });
}
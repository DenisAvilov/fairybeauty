const nodemailer = require('nodemailer')

class EmailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            //читаем информацию
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            service: 'gmail',
            // авторизационная информационная об акаунте с которого будут отправлятся письма
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationLink(to, activationLink) {

        await this.transporter.sendMail({
            // агент с которого оправляем почту
            from: process.env.SMTP_USER,
            //куда отправляем почту
            to,
            subject: 'Активация аккаунта ' + process.env.API_URL,
            text: '',
            html: `
            <div>
            <h1> Для активации перейдите по ссылке ниже</h1>
            <a href="${activationLink}">${activationLink}</a>
            </div>
            `
        });
    }
}

module.exports = new EmailService()
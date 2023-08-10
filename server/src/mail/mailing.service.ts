import {Injectable} from "@nestjs/common";
import {MailerService} from "@nestjs-modules/mailer";
import {google} from 'googleapis';
import {Options} from 'nodemailer/lib/smtp-transport';

@Injectable()

export class MailingService {
    constructor(private readonly mailerService: MailerService) {
    }

    private async setTransport() {
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            'https://developers.google.com/oauthplayground',
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
        });

        const accessToken: string = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    reject('Failed to create access token');
                }
                resolve(token);
            });
        });

        const config: Options = {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.SMTP_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                accessToken,
            },
        };
        this.mailerService.addTransporter('gmail', config);
    }


    async sendActivationMail(to, link) {
        await this.setTransport()
        this.mailerService
            .sendMail({
                transporterName: 'gmail',
                from: process.env.SMTP_USER,
                to,
                subject: 'Активаци аккаунта на ' + process.env.API_URL,
                text: '',
                html:
                    `
                    <div>
                        <h1>Для активации аккаунта перейдите по ссылке:</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
            })
            .then((success) => {
                console.log(success);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}


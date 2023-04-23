import { Transporter, createTransport } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import appMode from '../config/mode';
import {
  ETHEREAL_HOST,
  ETHEREAL_PORT,
  ETHEREAL_USER,
  ETHEREAL_PASS,
  GOOGLE_APP_PASS,
  APP_GMAIL,
} from '../config';

const createEmailTransporter =
  (): Transporter<SMTPTransport.SentMessageInfo> => {
    if (appMode.isProd()) {
      return createTransport({
        secure: true, // use SSL
        host: 'smtp.gmail.com',
        auth: {
          user: APP_GMAIL,
          pass: GOOGLE_APP_PASS,
        },
      });
    }

    return createTransport({
      logger: true,
      debug: true,
      host: ETHEREAL_HOST,
      port: Number(ETHEREAL_PORT),
      secure: true,
      auth: {
        user: ETHEREAL_USER,
        pass: ETHEREAL_PASS,
      },
    });
  };

export default createEmailTransporter;

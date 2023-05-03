import debug from 'debug';
import { SUPPORT_EMAIL } from '../../../config';
import createEmailTransporter from '../../../modules/email-transporter';
import prisma from '../../../modules/prisma';
import nuxtConfig from '../../../../nuxt.config';
import type { SendParam } from '@/types/api/email';

const log = debug('app:email');

export async function send({ email, name, message, userId }: SendParam) {
  const emailTransporter = createEmailTransporter();
  // send email to support
  const supportInfo = await emailTransporter.sendMail({
    from: email, // sender address
    to: SUPPORT_EMAIL, // list of receivers
    subject: `Message from user "${name}"`, // Subject line
    text: `User email:\n${email}\n\nUser message:\n${message}`, // plain text body
    html: `
      <div>
        <b>User email:</b><br/><a href="mailto:${email}">${email}</a>
        <br/><br/>
        <b>User message:</b>
        <p>${message}</p>
      </div>
    `,
  });
  log('sent supportInfo %O', supportInfo);

  // store user message
  await prisma.userMessage.create({
    data: {
      email,
      message,
      name,
      userId,
    },
  });

  // send confirm email to user
  const confirmInfo = await emailTransporter.sendMail({
    to: email, // list of receivers
    subject: `Message Received`, // Subject line
    headers: {
      'Content-Type': 'text/html',
    },
    html: `
      <div>
        <p>
        Dear ${name},
        <br/><br/>
        Thank you for contacting us.
        This is just a quick note to let you know that we have received your message
        and we will get back to you as soon as possible.
        We appreciate your interest in our company and look forward to
        the opportunity to connect with you.
        </p>
        <p>
          Please do not hesitate to contact us if you have any questions or concerns.
        </p>

        <p>Best regards,<br/> ${nuxtConfig.head.title} team</p>
      </div>
    `,
  });
  log('sent confirmInfo %O', confirmInfo);
}

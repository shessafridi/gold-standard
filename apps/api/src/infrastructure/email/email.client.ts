import env from '@/env';
import { Resend } from 'resend';

export type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  from?: string;
};

export class EmailClient {
  private resend = new Resend(env.RESEND_API_KEY);

  send(options: SendEmailOptions) {
    const { to, html, subject, from = env.FROM_EMAIL } = options;
    if (env.NODE_ENV !== 'production') console.log(html);
    return this.resend.emails.send({
      from,
      to,
      subject,
      html,
    });
  }
}

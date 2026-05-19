import { render } from 'react-email';

import type { NotificationData } from '../notifications/notifications.registry';
import OtpEmail from './templates/auth/otp.template';
import WelcomeEmail from './templates/auth/welcome.template';

type EmailTemplateConfig<T> = (data: T) => Promise<{
  html: string;
  subject: string;
}>;

export type EmailTemplatesProps = {
  'auth.otp': NotificationData['auth.otp'];
  'auth.welcome': NotificationData['auth.welcome'];
};

export const templates: {
  [K in keyof EmailTemplatesProps]: EmailTemplateConfig<EmailTemplatesProps[K]>;
} = {
  'auth.otp': async data => ({
    html: await render(OtpEmail(data)),
    subject: 'Your OTP Code',
  }),
  'auth.welcome': async data => ({
    html: await render(WelcomeEmail(data)),
    subject: `Welcome, ${data.name}!`,
  }),
};

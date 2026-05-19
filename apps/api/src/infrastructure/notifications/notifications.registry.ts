import type { MaybePromise } from '@/shared/types/maybe-promise';
import { type TransportContent } from '@/infrastructure/notifications/notifications.types';

import { templates } from '../email/email.registry';

type ChannelRenderers<T> = {
  [K in keyof TransportContent]?: (
    data: T
  ) => MaybePromise<TransportContent[K]>;
};

type NotificationRegistry = {
  [K in keyof NotificationData]: ChannelRenderers<NotificationData[K]>;
};

export type NotificationData = {
  'auth.otp': { name: string; code: string };
  'auth.welcome': { name: string };
  'appointments.reminder': { name: string; date: Date; doctorName: string };
};

export const registry: NotificationRegistry = {
  'auth.otp': {
    email: data => templates['auth.otp'](data),
    sms: data => ({
      body: `Hi ${data.name}, your verification code is ${data.code}. Valid for 10 minutes.`,
    }),
    whatsapp: data => ({
      body: `Hi ${data.name}, your verification code is ${data.code}. Valid for 10 minutes.`,
    }),
  },

  'auth.welcome': {
    email: data => templates['auth.welcome'](data),
    push: data => ({
      title: `Welcome, ${data.name}!`,
      body: `Your account is ready. Tap to get started.`,
    }),
  },

  'appointments.reminder': {
    email: data => ({
      subject: `Appointment reminder`,
      html: `<p>Hi ${data.name}, this is a reminder that you have an appointment with ${data.doctorName} on ${data.date.toLocaleDateString()}.</p>`,
    }),
    sms: data => ({
      body: `Hi ${data.name}, reminder: appointment with ${data.doctorName} on ${data.date.toLocaleDateString()}.`,
    }),
    push: data => ({
      title: `Upcoming appointment`,
      body: `With ${data.doctorName} on ${data.date.toLocaleDateString()}.`,
    }),
  },
};

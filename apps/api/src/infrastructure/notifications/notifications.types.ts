export type EmailChannel = {
  type: 'email';
  toEmail: string;
};

export type SmsChannel = {
  type: 'sms';
  phoneNumber: string;
};

export type WhatsAppChannel = {
  type: 'whatsapp';
  phoneNumber: string;
};

export type PushChannel = {
  type: 'push';
  userId: string;
};

export type NotificationChannel =
  | EmailChannel
  | SmsChannel
  | WhatsAppChannel
  | PushChannel;

export type NotificationChannelType = NotificationChannel['type'];

export type TransportContent = {
  email: { subject: string; html: string };
  sms: { body: string };
  whatsapp: { body: string };
  push: { title: string; body: string };
};

export type Transport<TChannel extends NotificationChannel> = {
  readonly type: TChannel['type'];
  send(
    channel: TChannel,
    content: TransportContent[TChannel['type']]
  ): Promise<void>;
};

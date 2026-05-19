import {
  type SmsChannel,
  type Transport,
  type TransportContent,
} from '@/infrastructure/notifications/notifications.types';

export class SmsTransport implements Transport<SmsChannel> {
  readonly type = 'sms' as const;

  async send(
    channel: SmsChannel,
    content: TransportContent['sms']
  ): Promise<void> {
    console.log(`SmsTransport Not Implemented`, {
      channel,
      content,
    });
    // await twilioClient.messages.create({
    //   to: channel.phoneNumber,
    //   from: process.env['TWILIO_FROM_NUMBER']!,
    //   body: content.body,
    // });
  }
}

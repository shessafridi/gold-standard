import type {
  SmsChannel,
  Transport,
  TransportContent,
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

    await Promise.resolve(); // placeholder to satisfy the async signature
    // await twilioClient.messages.create({
    //   to: channel.phoneNumber,
    //   from: process.env['TWILIO_FROM_NUMBER']!,
    //   body: content.body,
    // });
  }
}

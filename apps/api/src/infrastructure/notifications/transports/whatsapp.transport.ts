import type {
  Transport,
  TransportContent,
  WhatsAppChannel,
} from '@/infrastructure/notifications/notifications.types';

export class WhatsAppTransport implements Transport<WhatsAppChannel> {
  readonly type = 'whatsapp' as const;

  async send(
    channel: WhatsAppChannel,
    content: TransportContent['whatsapp']
  ): Promise<void> {
    console.log(`WhatsAppTransport Not Implemented`, {
      channel,
      content,
    });

    await Promise.resolve(); // placeholder to satisfy the async signature
    // await twilioClient.messages.create({
    //   to: `whatsapp:${channel.phoneNumber}`,
    //   from: `whatsapp:${process.env['TWILIO_WHATSAPP_NUMBER']}`,
    //   body: content.body,
    // });
  }
}

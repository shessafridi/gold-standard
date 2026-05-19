import {
  type PushChannel,
  type Transport,
  type TransportContent,
} from '@/infrastructure/notifications/notifications.types';

export class PushTransport implements Transport<PushChannel> {
  readonly type = 'push' as const;

  async send(
    channel: PushChannel,
    content: TransportContent['push']
  ): Promise<void> {
    console.log(`PushTransport Not Implemented`, {
      channel,
      content,
    });
    // const token = await getDeviceToken(channel.userId);
    // if (!token) return; // user has no registered device — skip silently

    // await firebaseAdmin.messaging().send({
    //   token,
    //   notification: {
    //     title: content.title,
    //     body: content.body,
    //   },
    // });
  }
}

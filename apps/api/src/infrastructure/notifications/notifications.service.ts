import type { NotificationData } from '@/infrastructure/notifications/notifications.registry';
import { registry } from '@/infrastructure/notifications/notifications.registry';
import {
  type NotificationChannel,
  type Transport,
} from '@/infrastructure/notifications/notifications.types';
import { ValidationError } from '@/shared/errors';

export type SendNotificationOptions<K extends keyof NotificationData> = {
  notification: K;
  data: NotificationData[K];
  channels: NotificationChannel[];
};

export class NotificationsService {
  private readonly transports = new Map<
    string,
    Transport<NotificationChannel>
  >();

  registerTransport(transport: Transport<NotificationChannel>): this {
    this.transports.set(transport.type, transport);
    return this;
  }

  async send<K extends keyof NotificationData>(
    options: SendNotificationOptions<K>
  ): Promise<void> {
    const config = registry[options.notification];

    const results = await Promise.allSettled(
      options.channels.map(async channel => {
        const transport = this.transports.get(channel.type);
        if (!transport) {
          throw new ValidationError(
            `No transport registered for channel "${channel.type}"`
          );
        }

        const renderer = config[channel.type];
        if (!renderer) {
          throw new ValidationError(
            `Notification "${options.notification}" has no renderer for channel "${channel.type}"`
          );
        }

        const content = await renderer(options.data);

        return transport.send(
          channel,
          content as Parameters<typeof transport.send>[1]
        );
      })
    );

    // Log failures without swallowing them — the caller still gets success
    // for the channels that worked
    for (const [index, result] of results.entries()) {
      if (result.status === 'rejected') {
        const channel = options.channels[index];
        console.error(
          `[notifications] Failed to send "${options.notification}" via "${channel?.type}":`,
          result.reason
        );
      }
    }
  }
}

export const notificationsService = new NotificationsService();

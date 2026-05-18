export type { NotificationData } from "@/infrastructure/notifications/notifications.registry"
export {
  NotificationsService,
  notificationsService,
} from "@/infrastructure/notifications/notifications.service"
export type { SendNotificationOptions } from "@/infrastructure/notifications/notifications.service"
export type {
  EmailChannel,
  NotificationChannel,
  NotificationChannelType,
  PushChannel,
  SmsChannel,
  Transport,
  TransportContent,
  WhatsAppChannel,
} from "@/infrastructure/notifications/notifications.types"

export { EmailTransport } from "@/infrastructure/notifications/transports/email.transport"
export { PushTransport } from "@/infrastructure/notifications/transports/push.transport"
export { SmsTransport } from "@/infrastructure/notifications/transports/sms.transport"
export { WhatsAppTransport } from "@/infrastructure/notifications/transports/whatsapp.transport"

export { setupNotifications } from "./setup-notifications"

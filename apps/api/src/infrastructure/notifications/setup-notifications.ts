import { notificationsService } from "./notifications.service"
import { EmailTransport } from "./transports/email.transport"
import { PushTransport } from "./transports/push.transport"
import { SmsTransport } from "./transports/sms.transport"
import { WhatsAppTransport } from "./transports/whatsapp.transport"

export const setupNotifications = () => {
  notificationsService
    .registerTransport(new EmailTransport())
    .registerTransport(new SmsTransport())
    .registerTransport(new WhatsAppTransport())
    .registerTransport(new PushTransport())
}

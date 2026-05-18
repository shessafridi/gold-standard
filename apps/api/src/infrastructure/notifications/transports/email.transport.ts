import { emailClient } from "@/infrastructure/email/email.provider"
import {
  type EmailChannel,
  type Transport,
  type TransportContent,
} from "@/infrastructure/notifications/notifications.types"

export class EmailTransport implements Transport<EmailChannel> {
  readonly type = "email" as const

  async send(
    channel: EmailChannel,
    content: TransportContent["email"]
  ): Promise<void> {
    await emailClient.send({
      to: channel.toEmail,
      subject: content.subject,
      html: content.html,
    })
  }
}

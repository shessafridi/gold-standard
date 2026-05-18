import { emailClient } from "./email.provider"
import type { EmailTemplatesProps } from "./email.registry"
import { templates } from "./email.registry"

export const emailService = {
  send: async <T extends keyof EmailTemplatesProps>(options: {
    template: T
    to: string
    data: EmailTemplatesProps[T]
    subject?: string
  }) => {
    const { template, data, to } = options

    const config = templates[template]

    const { subject, html } = await config(data)

    return emailClient.send({ to, subject: options.subject ?? subject, html })
  },
}

import env from '@/env';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
} from 'react-email';

import type { EmailTemplatesProps } from '../../email.registry';
import tailwindConfig from '../main-tw-theme';

type Props = EmailTemplatesProps['auth.otp'];

const baseUrl = '';

export const OtpEmail = ({ code }: Props) => (
  <Html>
    <Head />
    <Tailwind config={tailwindConfig}>
      <Body className='font-plaid bg-white'>
        <Container className='mx-auto my-0 mt-5 max-w-[360px] rounded border border-solid border-[#eee] bg-white px-4 pt-[68px] pb-[130px] shadow-md shadow-[rgba(20,50,70,.2)]'>
          <Img
            src={`${baseUrl}/static/plaid-logo.png`}
            width='212'
            height='88'
            alt='Plaid'
            className='mx-auto my-0'
          />
          <Text className='mx-2 mt-4 mb-2 h-4 text-center text-[11px] leading-[16px] font-bold tracking-[0] text-[#0a85ea] uppercase'>
            Verify Your Identity 123123123
          </Text>
          <Heading className='my-0 inline-block text-center font-[HelveticaNeue-Medium,Helvetica,Arial,sans-serif] text-[20px] leading-[24px] font-medium text-black'>
            Enter the following code to finish linking {env.APP_NAME}.
          </Heading>
          <Section className='mx-auto mt-4 mb-3.5 w-[280px] rounded bg-[rgba(0,0,0,.05)] align-middle'>
            <Text className='mx-auto my-0 block py-2 text-center text-[32px] leading-10 font-bold tracking-[6px] text-black'>
              {code}
            </Text>
          </Section>
          <Text className='m-0 px-10 py-0 text-center text-[15px] leading-[23px] tracking-[0] text-[#444]'>
            Not expecting this email?
          </Text>
          <Text className='m-0 px-10 py-0 text-center text-[15px] leading-[23px] tracking-[0] text-[#444]'>
            Contact{' '}
            <Link
              href={`mailto:${env.CONTACT_EMAIL}`}
              className='text-[#444] underline'
            >
              {env.CONTACT_EMAIL}
            </Link>{' '}
            if you did not request this code.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

OtpEmail.PreviewProps = {
  code: '123456',
} as Props;

export default OtpEmail;

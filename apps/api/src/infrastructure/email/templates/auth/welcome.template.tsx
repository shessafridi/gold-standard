import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email';

import type { EmailTemplatesProps } from '../../email.registry';
import tailwindConfig from '../main-tw-theme';

type Props = EmailTemplatesProps['auth.welcome'];

const baseUrl = '';

export const WelcomeEmail = ({ name }: Props) => (
  <Html>
    <Head />
    <Tailwind config={tailwindConfig}>
      <Body className='font-koala bg-white'>
        <Preview>
          The sales intelligence platform that helps you uncover qualified
          leads.
        </Preview>
        <Container className='mx-auto py-5 pb-12'>
          <Img
            src={`${baseUrl}/static/koala-logo.png`}
            width='170'
            height='50'
            alt='Koala'
            className='mx-auto'
          />
          <Text className='text-[16px] leading-[26px]'>Hi {name},</Text>
          <Text className='text-[16px] leading-[26px]'>
            Welcome to Koala, the sales intelligence platform that helps you
            uncover qualified leads and close deals faster.
          </Text>
          <Section className='text-center'>
            <Button
              className='block rounded-[3px] bg-[#5F51E8] p-3 text-center text-[16px] text-white no-underline'
              href='https://getkoala.com'
            >
              Get started
            </Button>
          </Section>
          <Text className='text-[16px] leading-[26px]'>
            Best,
            <br />
            The Koala team
          </Text>
          <Hr className='my-5 border-[#cccccc]' />
          <Text className='text-[12px] text-[#8898aa]'>
            470 Noor Ave STE B #1148, South San Francisco, CA 94080
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

WelcomeEmail.PreviewProps = {
  name: 'John Doe',
} as Props;

export default WelcomeEmail;

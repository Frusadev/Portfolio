import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface LoginEmailProps {
  magicLink: string;
  email?: string;
  token?: string;
}

export const LoginEmail = ({
  magicLink = "https://example.com/verify",
  email = "user@example.com",
}: LoginEmailProps) => {
  return (
    <Html>
      <Preview>Sign in to your account</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-white font-sans my-auto mx-auto px-2">
          <Container className="border border-solid border-[#eaeaea] rounded-xl my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-bold text-center p-0 my-[30px] mx-0">
              Welcome Back
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Hello,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We received a request to sign in to your account using this email
              address: <strong>{email}</strong>.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-black rounded-lg text-white text-[14px] font-medium no-underline text-center px-6 py-3"
                href={magicLink}
              >
                Sign in
              </Button>
            </Section>

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you didn&apos;t request this, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default LoginEmail;

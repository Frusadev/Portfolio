import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Link,
  Section,
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
      <Head />
      <Preview>Sign in to your account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <Text style={tag}>Daniel Ametsowou</Text>
            <Text style={heading}>Welcome back</Text>
            <Text style={paragraph}>
              A sign-in request was received for{" "}
              <span style={highlight}>{email}</span>. Click the button below to
              complete your sign-in.
            </Text>

            <Section style={btnContainer}>
              <Link style={button} href={magicLink}>
                Sign in to your account
              </Link>
            </Section>

            <Text style={footer}>
              If you didn&apos;t request this email, you can safely ignore it.
              This magic link expires shortly.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#050505",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  padding: "40px 0",
};

const container = {
  margin: "0 auto",
  maxWidth: "540px",
  padding: "0 20px",
};

const card = {
  backgroundColor: "#0A0A0A",
  borderRadius: "20px",
  padding: "40px 36px",
};

const tag = {
  fontSize: "12px",
  letterSpacing: "0.5px",
  color: "#5A5A5A",
  margin: "0 0 16px 0",
};

const heading = {
  fontSize: "24px",
  fontWeight: "500",
  letterSpacing: "-0.5px",
  color: "#EDEDED",
  margin: "0 0 16px 0",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#858585",
  margin: "0 0 28px 0",
};

const highlight = {
  color: "#EDEDED",
  fontWeight: "500",
};

const btnContainer = {
  margin: "0 0 28px 0",
};

const button = {
  backgroundColor: "#EDEDED",
  color: "#050505",
  padding: "12px 28px",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "13px",
  borderRadius: "9999px",
  display: "inline-block",
};

const footer = {
  fontSize: "12px",
  lineHeight: "20px",
  color: "#5A5A5A",
  margin: "0",
};

export default LoginEmail;

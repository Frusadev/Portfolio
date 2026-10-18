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

interface CommentReplyEmailProps {
  postTitle: string;
  postSlug: string;
  replyContent: string;
  replierName: string;
}

export default function CommentReplyEmail({
  postTitle = "A Post",
  postSlug,
  replyContent = "Here is a thoughtful reply.",
  replierName = "Someone",
}: CommentReplyEmailProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_BASE_URL ||
    process.env.APP_BASE_URL ||
    "https://danielametsowou.com";

  return (
    <Html>
      <Head />
      <Preview>New reply to your comment on &quot;{postTitle}&quot;</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <Text style={tag}>Reply notification</Text>
            <Text style={heading}>Someone replied to your comment</Text>
            <Text style={paragraph}>
              <strong style={highlight}>{replierName}</strong> replied to your
              comment on <strong style={highlight}>{postTitle}</strong>:
            </Text>

            <Section style={quoteBox}>
              <Text style={quoteText}>&ldquo;{replyContent}&rdquo;</Text>
            </Section>

            <Section style={btnContainer}>
              <Link
                style={button}
                href={`${baseUrl}/blog/${postSlug}`}
              >
                View reply
              </Link>
            </Section>

            <Text style={footer}>
              Daniel Ametsowou — Writing & Explorations
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

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
  fontSize: "22px",
  fontWeight: "500",
  letterSpacing: "-0.5px",
  color: "#EDEDED",
  margin: "0 0 16px 0",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#858585",
  margin: "0 0 20px 0",
};

const highlight = {
  color: "#EDEDED",
  fontWeight: "500",
};

const quoteBox = {
  backgroundColor: "#141416",
  borderRadius: "14px",
  padding: "18px 20px",
  margin: "0 0 28px 0",
};

const quoteText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#EDEDED",
  fontStyle: "italic",
  margin: "0",
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
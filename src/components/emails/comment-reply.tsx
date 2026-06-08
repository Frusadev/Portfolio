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
  replyContent = "This is a reply!",
  replierName = "John Doe",
}: CommentReplyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New reply on your comment in &quot;{postTitle}&quot;</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>Someone replied to your comment!</Text>
          <Text style={paragraph}>
            <strong>{replierName}</strong> just replied to your comment on the post: 
            <strong>{postTitle}</strong>
          </Text>
          <Section style={commentSection}>
            <Text style={commentText}>&quot;{replyContent}&quot;</Text>
          </Section>
          <Section style={btnContainer}>
            <Link
              style={button}
              href={`https://ametsowou.me/blog/${postSlug}`}
            >
              View Reply
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fbf5e9",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#450a0a", // red-950
  textAlign: "center" as const,
  margin: "30px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#450a0a",
};

const commentSection = {
  backgroundColor: "rgba(69, 10, 10, 0.05)",
  borderLeft: "4px solid #450a0a",
  padding: "16px",
  margin: "24px 0",
};

const commentText = {
  fontSize: "16px",
  fontStyle: "italic",
  color: "#450a0a",
  margin: "0",
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "32px",
};

const button = {
  backgroundColor: "#450a0a",
  color: "#fbf5e9",
  padding: "12px 24px",
  textDecoration: "none",
  fontWeight: "bold",
  display: "inline-block",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};
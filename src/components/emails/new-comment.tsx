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

interface NewCommentEmailProps {
  postTitle: string;
  postSlug: string;
  commentContent: string;
  authorName: string;
}

export default function NewCommentEmail({
  postTitle = "A Post",
  postSlug,
  commentContent = "This is a great post!",
  authorName = "John Doe",
}: NewCommentEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Comment on &quot;{postTitle}&quot;</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>New Comment Received!</Text>
          <Text style={paragraph}>
            <strong>{authorName}</strong> just commented on your post:
            <strong>{postTitle}</strong>
          </Text>
          <Section style={commentSection}>
            <Text style={commentText}>&quot;{commentContent}&quot;</Text>
          </Section>
          <Section style={btnContainer}>
            <Link
              style={button}
              href={`https://ametsowou.me/admin/blog/comments`}
            >
              View in Admin Panel
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

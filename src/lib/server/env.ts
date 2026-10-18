type Env =
  | "DATABASE_URL"
  | "DEBUG"
  | "SMTP_HOST"
  | "APP_EMAIL"
  | "SMTP_PASSWORD"
  | "SMTP_USERNAME"
  | "APP_BASE_URL"
  | "AUTHORIZED_EMAILS"
  | "SUPPORT_EMAIL"
  | "NEXT_PUBLIC_APP_BASE_URL"
  | "BETTER_AUTH_SECRET"
  | "BETTER_AUTH_URL"
  | "GITHUB_CLIENT_ID"
  | "GITHUB_CLIENT_SECRET"
  | "GITHUB_USERNAME"
  | "DEFAULT_FROM_NAME"
  | "CORS_ORIGINS"
  | "R2_ACCESS_KEY_ID"
  | "R2_SECRET_ACCESS_KEY"
  | "R2_BUCKET_NAME"
  | "R2_ENDPOINT"
  | "R2_BUCKET_PUBLIC_ENDPOINT"
  | "NEXT_PUBLIC_CONTACT_EMAIL";

export function getEnv(
  key: Env,
  defaultValue: string | undefined = undefined,
): string {
  const value = process.env[key] ?? defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

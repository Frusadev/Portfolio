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
  | "DEFAULT_FROM_NAME"
  | "CORS_ORIGINS";

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

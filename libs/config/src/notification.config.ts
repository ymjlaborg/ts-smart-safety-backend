import { registerAs } from '@nestjs/config';

export default registerAs('notification', () => ({
  useResend: process.env.NOTIFICATION_USE_RESEND,
  resendTimer: Number(process.env.NOTIFICATION_RESEND_TIMER),
  serviceAccountKey: process.env.NOTIFICATION_ACCOUNT_PATH,
}));

import { registerAs } from '@nestjs/config';

export default registerAs('notification', () => ({
  resendTimer: Number(process.env.NOTIFICATION_RESEND_TIMER),
}));

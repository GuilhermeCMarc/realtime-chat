import { z } from 'zod';

export const createConversationSchema = z.object({
  userIds: z.array(z.string().uuid()).min(2).max(2)
});
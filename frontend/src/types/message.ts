import { User } from "./user";

export type Message = {
  id: string;
  content: string;
  created_at: Date;

  sent_by: User;
  userId: string;
};

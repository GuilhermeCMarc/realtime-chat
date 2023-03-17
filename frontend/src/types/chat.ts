import { Message } from "./message";
import { User } from "./user";

export type Conversation = {
  id: string;
  users: User[];
  messages: Message[];
};

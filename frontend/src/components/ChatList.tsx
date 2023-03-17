import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useQuery } from "react-query";
import { listChats } from "../api/realtime-chat";
import { useAuth } from "../contexts/AuthContext";
import { Conversation } from "../types/chat";
import { User } from "../types/user";
import Spinner from "./feedback/Spinner";
import Input from "./form/Input";

export default function ChatList() {
  const { data, error, isLoading } = useQuery<{
    conversations: Conversation[];
  }>("chat-list", listChats);

  const { user } = useAuth();

  const [search, setSearch] = useState("");

  console.log({ data });

  const filteredChats = data?.conversations.filter(
    (item) =>
      // item.name.trim().toLowerCase().includes(search.trim().toLowerCase())
      true
  );

  function getOtherUser(conversation: Conversation) {
    return conversation.users.find((otherUser) => otherUser.id !== user!.id);
  }

  return (
    <>
      <div>
        <div className="relative">
          <Input className="pl-9" placeholder="Search conversations..." />
          <div className="absolute left-3 top-[50%] transform translate-y-[-50%]">
            {isLoading ? <Spinner /> : <MagnifyingGlassIcon />}
          </div>
        </div>
      </div>
      {error && (
        <div className="p-4 bg-red1 border border-red6 text-red12 mt-5 rounded-md">
          <p className="text-sm mb-1">Error loading chats</p>
          <p className="text-xs text-red11">
            {(error as any)?.message ?? "Something wrong has happened"}
          </p>
        </div>
      )}
      <ul className="space-y-5 mt-5">
        {!error &&
          filteredChats?.map((item) => (
            <li key={item.id}>{getOtherUser(item)?.name || "Error"}</li>
          ))}

        {!error && filteredChats?.length === 0 && (
          <li className="text-center text-slate11">
            No conversations were found...
          </li>
        )}
      </ul>
    </>
  );
}

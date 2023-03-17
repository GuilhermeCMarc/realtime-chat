import { DotsVerticalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Outlet } from "react-router-dom";
import ChatList from "../../components/ChatList";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import Avatar from "../../components/presentation/Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../types/user";

export default function ChatPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen max-w-screen-lg mx-auto grid grid-cols-[348px_auto]">
      <aside>
        <div className="p-5 grid grid-cols-[48px_auto_40px] gap-4">
          <Avatar rounded user={user as User} />
          <div>
            <p className="font-bold">{user!.name}</p>
            <p className="text-slate11 text-sm">{user!.email}</p>
          </div>
          <Button intent="transparent" icon>
            <DotsVerticalIcon />
          </Button>
        </div>
        <span className="w-full h-[1px] bg-slate6 flex" />
        <div className="p-5">
          <ChatList />
        </div>
      </aside>
      <main className="p-5 border-r border-l border-slate6">
        <Outlet />
      </main>
    </div>
  );
}

import Center from "../../components/presentation/Center";

export default function SelectChatPage() {
  return (
    <Center>
      <div>
        <h1 className="text-lg font-bold text-center mb-1">
          No conversation selected
        </h1>
        <p className="text-slate11 text-center">
          Select a conversation to start chatting
        </p>
      </div>
    </Center>
  );
}

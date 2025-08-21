import ChatWidget from "@/components/chatui/chat-ui";



export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ChatWidget title="AI Assistant" avatar="/friendly-ai-assistant.png" />
    </div>
  )
}

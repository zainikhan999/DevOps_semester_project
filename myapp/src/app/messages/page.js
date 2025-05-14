// src/app/messages/page.js
import { Suspense } from "react";
import ChatComponent from "../components/ChatComponent";
export default function MessagesPage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatComponent />
    </Suspense>
  );
}

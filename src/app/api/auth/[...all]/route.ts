import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { type NextRequest, NextResponse } from "next/server"

export const { POST, GET } = toNextJsHandler(auth);

export async function chatApi(request: NextRequest) {
  try {
    const { message } = await request.json()

    let response = ""
    const lowerMessage = message.toLowerCase().trim()

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      response = "Hello! How can I assist you today?"
    } else if (lowerMessage.includes("services") || lowerMessage.includes("service")) {
      response = "We provide web development, mobile app development, and AI solutions."
    } else if (lowerMessage.includes("help")) {
      response = "How can I help you? Please ask me anything about our services."
    } else {
      response = "I'm still learning! Can you tell me more?"
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
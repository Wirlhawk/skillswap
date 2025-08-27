"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { OrderMessagesProps } from "@/types/order";
import { MessageCircle, Send, Paperclip, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area"; 

export function OrderMessages({
    messages,
    onSendMessage,
    currentUserId,
}: OrderMessagesProps) {
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    };

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            setIsTyping(true);
            await onSendMessage(newMessage);
            setNewMessage("");
            setIsTyping(false);
            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleTextareaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setNewMessage(e.target.value);

        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    };

    const groupMessagesByDate = () => {
        const groups: { [key: string]: typeof messages } = {};
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        messages.forEach((message) => {
            const messageDate = new Date(message.createdAt);
            const dateString = messageDate.toDateString();

            let displayDate;
            if (dateString === today) {
                displayDate = "Today";
            } else if (dateString === yesterday) {
                displayDate = "Yesterday";
            } else {
                displayDate = messageDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                });
            }

            if (!groups[displayDate]) {
                groups[displayDate] = [];
            }
            groups[displayDate].push(message);
        });

        return groups;
    };

    const messageGroups = groupMessagesByDate();

    return (
        <Card className="flex flex-col h-[700px] shadow-brutal">
            <CardHeader className="pb-4 border-b border-border">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg shadow-brutal-sm">
                            <MessageCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-lg font-bold">Project Chat</span>
                    </CardTitle>
                    <Badge
                        variant="secondary"
                        className="shadow-brutal-sm font-medium"
                    >
                        {messages.length}{" "}
                        {messages.length === 1 ? "message" : "messages"}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
                <ScrollArea className="flex-1 px-6 py-4">
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center p-8 rounded-xl bg-muted/30 shadow-brutal border-2 border-dashed border-muted-foreground/20">
                                <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4 shadow-brutal-sm">
                                    <MessageCircle className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">
                                    No messages yet
                                </h3>
                                <p className="text-muted-foreground">
                                    Start the conversation with your client or
                                    freelancer!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {Object.entries(messageGroups).map(
                                ([date, dateMessages]) => (
                                    <div key={date}>
                                        <div className="relative flex items-center py-4">
                                            <div className="flex-grow border-t-2 border-muted"></div>
                                            <div className="px-4 py-1 bg-background border-2 border-muted rounded-full shadow-brutal-sm">
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    {date}
                                                </span>
                                            </div>
                                            <div className="flex-grow border-t-2 border-muted"></div>
                                        </div>

                                        <div className="space-y-4">
                                            {dateMessages.map(
                                                (message, index) => {
                                                    const isCurrentUser =
                                                        currentUserId &&
                                                        message.senderId ===
                                                            currentUserId;
                                                    const showAvatar =
                                                        index === 0 ||
                                                        dateMessages[index - 1]
                                                            .senderId !==
                                                            message.senderId;

                                                    return (
                                                        <div
                                                            key={message.id}
                                                            className={cn(
                                                                "flex gap-3 group",
                                                                isCurrentUser
                                                                    ? "flex-row-reverse"
                                                                    : "",
                                                                !showAvatar &&
                                                                    "ml-11"
                                                            )}
                                                        >
                                                            {showAvatar && (
                                                                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                                                    <Avatar className="h-10 w-10 border-2 border-border shadow-brutal-sm">
                                                                        <AvatarImage
                                                                            src={
                                                                                message
                                                                                    .sender
                                                                                    .image ||
                                                                                "/placeholder.svg"
                                                                            }
                                                                            alt={
                                                                                message
                                                                                    .sender
                                                                                    .name
                                                                            }
                                                                        />
                                                                        <AvatarFallback className="font-bold text-sm">
                                                                            {message.sender.name[0].toUpperCase()}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <span className="text-xs text-muted-foreground font-medium">
                                                                        {isCurrentUser
                                                                            ? "You"
                                                                            : message.sender.name.split(
                                                                                  " "
                                                                              )[0]}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            <div
                                                                className={cn(
                                                                    "flex-1 max-w-md",
                                                                    isCurrentUser
                                                                        ? "items-end"
                                                                        : "items-start"
                                                                )}
                                                            >
                                                                <div
                                                                    className={cn(
                                                                        "relative p-4 rounded-xl shadow-brutal border-2 transition-all duration-200 group-hover:shadow-brutal-lg",
                                                                        isCurrentUser
                                                                            ? "bg-primary text-primary-foreground border-primary/20 rounded-tr-md ml-auto"
                                                                            : "bg-card border-border rounded-tl-md"
                                                                    )}
                                                                >
                                                                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                                                        {
                                                                            message.message
                                                                        }
                                                                    </p>

                                                                    <div
                                                                        className={cn(
                                                                            "flex items-center gap-2 mt-2 pt-2 border-t border-current/10",
                                                                            isCurrentUser
                                                                                ? "justify-end"
                                                                                : "justify-start"
                                                                        )}
                                                                    >
                                                                        <span className="text-xs opacity-70 font-medium">
                                                                            {new Date(
                                                                                message.createdAt
                                                                            ).toLocaleTimeString(
                                                                                [],
                                                                                {
                                                                                    hour: "2-digit",
                                                                                    minute: "2-digit",
                                                                                }
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </ScrollArea>

                <div className="p-6 border-t-2 border-border bg-muted/20">
                    <div className="flex gap-3 items-end">
                        <div className="flex-1 relative">
                            <Textarea
                                ref={textareaRef}
                                placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                                value={newMessage}
                                onChange={handleTextareaChange}
                                onKeyDown={handleKeyPress}
                                className="min-h-[50px] max-h-[120px] resize-none shadow-brutal border-2 focus:shadow-brutal-lg transition-all duration-200 pr-20"
                                rows={1}
                                disabled={isTyping}
                            />

                            <div className="absolute right-3 bottom-3 flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-muted"
                                    type="button"
                                >
                                    <Paperclip className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-muted"
                                    type="button"
                                >
                                    <Smile className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <Button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim() || isTyping}
                            className="h-12 w-12 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 disabled:opacity-50"
                            size="icon"
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>

                    {isTyping && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                                <div
                                    className="w-2 h-2 bg-current rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                    className="w-2 h-2 bg-current rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                ></div>
                            </div>
                            <span>Sending...</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

"use client";
import { useState } from "react";
import { MessageSquareText, X, Send, Bot } from 'lucide-react';
import React from "react";
export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    //call this function when user sends a message
    const sendMessage = async () => {
        if (!input.trim()) return;// prevent sending empty messages

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: input }),

            });

            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setMessages((prev) => [...prev, { role: "bot", content: data.text }]);
        } catch (err) {
            console.error("Chat Error:", err);
            setMessages((prev) => [...prev, { role: "bot", content: "Sorry, I'm having trouble connecting." }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Format message content  of the bot's response
    const formatMessage = (content: string) => {
        const lines = content.split('\n');
        const elements: React.ReactNode[] = [];
        let key = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Skip empty lines
            if (!line.trim()) {
                elements.push(<div key={key++} className="h-2" />);
                continue;
            }

            // Headers (###)
            if (line.startsWith('### ')) {
                elements.push(
                    <h3 key={key++} className="text-sm sm:text-base font-bold text-gray-900 mt-3 mb-1.5">
                        {line.replace(/^### /, '')}
                    </h3>
                );
            }
            // Subheaders (*)
            else if (line.startsWith('* **')) {
                const match = line.match(/\* \*\*(.+?)\*\*:?\s*(.*)/);
                if (match) {
                    elements.push(
                        <div key={key++} className="mb-1.5">
                            <span className="font-semibold text-gray-800 text-xs sm:text-sm">{match[1]}:</span>
                            {match[2] && <span className="text-gray-700 text-xs sm:text-sm"> {match[2]}</span>}
                        </div>
                    );
                }
            }
            // Bold inline text (**text**)
            else if (line.includes('**')) {
                const parts = line.split(/(\*\*.*?\*\*)/g);
                elements.push(
                    <p key={key++} className="text-gray-700 text-xs sm:text-sm mb-1.5 leading-relaxed">
                        {parts.map((part, idx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={idx} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
                            }
                            return <span key={idx}>{part}</span>;
                        })}
                    </p>
                );
            }
            // Divider (---)
            else if (line.trim() === '---') {
                elements.push(<hr key={key++} className="my-2 sm:my-3 border-gray-300" />);
            }
            // Regular paragraphs
            else {
                elements.push(
                    <p key={key++} className="text-gray-700 text-xs sm:text-sm mb-1.5 leading-relaxed">
                        {line}
                    </p>
                );
            }
        }

        return <div className="space-y-0.5">{elements}</div>;
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-primary hover:bg-primary-hover text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-50"
                >
                    <MessageSquareText />
                </button>
            )}

            {/* Chat Window*/}
            {isOpen && (
                <>
                    {/* Mobile Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Chat Window */}
                    <div className="fixed inset-x-0  bottom-0 md:bottom-6 md:right-6 md:inset-x-auto md:w-80 h-[100dvh] md:h-[500px] bg-white md:rounded-2xl shadow-2xl border border-none flex flex-col z-50">
                        {/* Header */}
                        <div className=" text-white p-4 md:rounded-t-2xl flex justify-between items-center bg-primary">
                            <div>
                                <div className="flex">
                                    <Bot />
                                    <h3 className="font-bold text-base sm:text-lg text-slate-100!">Iterra Assistant</h3>
                                </div>

                                <p className="text-xs opacity-90">Powered by Google Gemini AI</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition"
                            >
                                <X />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-400 text-sm mt-20">
                                    👋 Ask me about travel destinations!
                                </div>
                            )}
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    {m.role === "user" ? (
                                        <div className="max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2 rounded-2xl bg-blue-600 text-white rounded-br-sm">
                                            <p className="text-xs sm:text-sm">{m.content}</p>
                                        </div>
                                    ) : (
                                        <div className="max-w-[90%] sm:max-w-[85%] px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-white border border-gray-200 rounded-bl-sm shadow-sm">
                                            <p className="text-xs font-medium text-blue-600 mb-1.5">Iterra</p>
                                            <div className="prose prose-sm max-w-none">
                                                {formatMessage(m.content)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border border-gray-200">
                                        <p className="text-xs text-gray-500 animate-pulse">Generating response...</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-3 sm:p-4 border-t border-gray-200 bg-white md:rounded-b-2xl safe-bottom">
                            <div className="flex gap-2">
                                <input
                                    value={input}
                                    disabled={isLoading}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 border border-gray-300 px-3 py-2 sm:py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Where to next?"
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={isLoading || !input.trim()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition disabled:bg-gray-300 flex-shrink-0"
                                >
                                    <Send />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
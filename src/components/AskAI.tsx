import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, X, Minus, Terminal } from "lucide-react";
import { aiAPI } from "@/lib/api";
import { AIMessage } from "@/types";

export default function AskAI() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      _id: "1",
      content: "Hi! I'm Gaurav's AI assistant. Ask me anything about his experience, projects, or skills!",
      role: "assistant",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!currentMessage.trim() || isLoading) return;
    const userMsg: AIMessage = {
      _id: Date.now().toString(),
      content: currentMessage,
      role: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setCurrentMessage("");
    setIsLoading(true);
    try {
      const response = await aiAPI.ask(currentMessage);
      const aiMsg: AIMessage = {
        _id: (Date.now() + 1).toString(),
        content: response.data.answer,
        role: "assistant",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          _id: (Date.now() + 1).toString(),
          content: "Connection lost. Please try again.",
          role: "assistant",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00F5FF, #00FF41)",
              boxShadow: "0 0 20px rgba(0,245,255,0.4), 0 4px 15px rgba(0,0,0,0.3)",
              color: "#0D1117",
            }}
          >
            <Terminal className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-80 rounded-lg overflow-hidden"
            style={{
              background: "#0D1117",
              border: "1px solid rgba(0,245,255,0.25)",
              boxShadow: "0 0 30px rgba(0,245,255,0.15), 0 20px 50px rgba(0,0,0,0.6)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ background: "rgba(0,245,255,0.05)", borderBottom: "1px solid rgba(0,245,255,0.15)" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA41" }} />
                </div>
                <span className="font-mono text-xs ml-1" style={{ color: "rgba(0,245,255,0.5)" }}>
                  ai@gaurav — chat
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-6 h-6 rounded flex items-center justify-center transition-colors duration-150"
                  style={{ color: "rgba(0,245,255,0.4)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#00F5FF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(0,245,255,0.4)")}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded flex items-center justify-center transition-colors duration-150"
                  style={{ color: "rgba(0,245,255,0.4)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FF5F57")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(0,245,255,0.4)")}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Body */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="flex flex-col"
                  style={{ maxHeight: "380px" }}
                >
                  {/* Messages */}
                  <div
                    ref={chatContainerRef}
                    className="flex-1 p-4 space-y-3 overflow-y-auto"
                    style={{ maxHeight: "280px" }}
                  >
                    {messages.map((msg) => (
                      <motion.div
                        key={msg._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex items-start gap-2 max-w-[85%] ${
                            msg.role === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              background: msg.role === "user" ? "rgba(0,245,255,0.2)" : "rgba(0,255,65,0.2)",
                              border: msg.role === "user"
                                ? "1px solid rgba(0,245,255,0.4)"
                                : "1px solid rgba(0,255,65,0.4)",
                            }}
                          >
                            {msg.role === "user" ? (
                              <User className="w-3 h-3" style={{ color: "#00F5FF" }} />
                            ) : (
                              <Bot className="w-3 h-3" style={{ color: "#00FF41" }} />
                            )}
                          </div>
                          <div
                            className="p-2.5 rounded text-xs leading-relaxed font-mono"
                            style={{
                              background: msg.role === "user"
                                ? "rgba(0,245,255,0.08)"
                                : "rgba(0,255,65,0.06)",
                              border: msg.role === "user"
                                ? "1px solid rgba(0,245,255,0.2)"
                                : "1px solid rgba(0,255,65,0.15)",
                              color: msg.role === "user"
                                ? "rgba(0,245,255,0.9)"
                                : "rgba(0,255,65,0.9)",
                            }}
                          >
                            {msg.content}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-1.5 px-3 py-2 rounded font-mono text-xs"
                          style={{ background: "rgba(0,255,65,0.06)", border: "1px solid rgba(0,255,65,0.15)", color: "#00FF41" }}>
                          <span className="animate-pulse">processing</span>
                          <span className="terminal-cursor" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div
                    className="flex items-center gap-2 p-3"
                    style={{ borderTop: "1px solid rgba(0,245,255,0.1)" }}
                  >
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: "#00FF41" }}>{">"}</span>
                    <input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                      placeholder="ask anything..."
                      disabled={isLoading}
                      className="flex-1 bg-transparent font-mono text-xs outline-none"
                      style={{ color: "#00F5FF" }}
                    />
                    <button
                      onClick={handleSend}
                      disabled={isLoading || !currentMessage.trim()}
                      className="w-6 h-6 rounded flex items-center justify-center transition-all duration-150 disabled:opacity-30"
                      style={{ color: "#00F5FF" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#00FF41")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#00F5FF")}
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

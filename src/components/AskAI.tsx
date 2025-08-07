import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { aiAPI } from "@/lib/api";
import { AIMessage } from "@/types";
import { useRef, useEffect } from "react"; 


export default function AskAI() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    
    {
      _id: "1",
      content:
        "Hi! I'm Gaurav's AI assistant. Feel free to ask me anything about his experience, projects, or skills!",
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

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: AIMessage = {
      _id: Date.now().toString(),
      content: currentMessage,
      role: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const response = await aiAPI.ask(currentMessage);
      console.log("AI Response:", response);
      const aiMessage: AIMessage = {
        _id: (Date.now() + 1).toString(),
        content: response.data.answer,
        role: "assistant",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorMessage: AIMessage = {
        _id: (Date.now() + 1).toString(),
        content:
          "Sorry, I'm having trouble responding right now. Please try again later!",
        role: "assistant",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-gradient-primary rounded-full shadow-3d flex items-center justify-center text-primary-foreground hover:shadow-3d-hover transition-all duration-300 pulse-glow"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: 50, y: 50 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
              height: isMinimized ? 60 : 500,
            }}
            exit={{ scale: 0, opacity: 0, x: 50, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-card border border-border/50 rounded-2xl shadow-3d overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-primary p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">
                    Ask AI
                  </h3>
                  <p className="text-xs text-primary-foreground/80">
                    {isLoading ? "Thinking..." : "Online"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 text-primary-foreground hover:bg-white/20"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 text-primary-foreground hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-col h-96"
                >
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4 overflow-y-auto">
  <div
    ref={chatContainerRef}
    className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scroll-smooth"
  >
    {messages.map((message) => (
      <motion.div
        key={message._id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${
          message.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`flex items-start space-x-2 max-w-[80%] ${
            message.role === "user"
              ? "flex-row-reverse space-x-reverse"
              : ""
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === "user" ? "bg-primary" : "bg-secondary"
            }`}
          >
            {message.role === "user" ? (
              <User className="w-3 h-3 text-primary-foreground" />
            ) : (
              <Bot className="w-3 h-3 text-secondary-foreground" />
            )}
          </div>
          <div
            className={`p-3 rounded-lg text-sm ${
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {message.content}
          </div>
        </div>
      </motion.div>
    ))}
    {isLoading && (
      <div className="flex justify-start">
        <div className="flex items-start space-x-2">
          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
            <Bot className="w-3 h-3 text-secondary-foreground" />
          </div>
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</ScrollArea>

                  {/* Input */}
                  <div className="border-t border-border/50 p-4">
                    <div className="flex space-x-2">
                      <Input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="flex-1 bg-input/50 border-border/50 focus:border-primary text-sm resize-none"
                        disabled={isLoading}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={isLoading || !currentMessage.trim()}
                        size="icon"
                        className="bg-primary hover:bg-primary/90 flex-shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
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

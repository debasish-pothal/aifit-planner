"use client";

import StatusChip from "@/components/status-chip";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CreatePlan() {
  const [callActive, setCallActive] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const { user } = useUser();

  const router = useRouter();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const toggleCall = async () => {
    if (callActive) {
      vapi.stop();
    } else {
      try {
        setConnecting(true);
        setCallEnded(false);
        setMessages([]);

        const fullName =
          user?.firstName || user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : "User";

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
          variableValues: {
            full_name: fullName,
            user_id: user?.id,
          },
        });
      } catch (error) {
        setConnecting(false);
        setCallActive(false);
        setCallEnded(true);
        console.error("An error occurred while starting the call.", error);
      }
    }
  };

  const handleCallStart = () => {
    setCallActive(true);
    setConnecting(false);
  };

  const handleCallEnd = () => {
    setCallActive(false);
    setCallEnded(true);
  };

  const handleSpeechStart = () => {
    setIsSpeaking(true);
  };

  const handleSpeechEnd = () => {
    setIsSpeaking(false);
  };

  const handleMessage = (message: any) => {
    if (message.type === "transcript" && message.transcriptType === "final") {
      const newMessage = {
        content: message.transcript,
        role: message.role,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const handleError = (error: string) => {
    setConnecting(false);
    setCallActive(false);
    setCallEnded(true);
    console.error("Error:", error);
  };

  useEffect(() => {
    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/my-profile");
      }, 2000);

      return () => {
        clearTimeout(redirectTimer);
      };
    }
  }, [callEnded]);

  return (
    <div
      className={`${
        messages.length > 0 ? "grid grid-cols-2" : "flex"
      } items-center justify-center min-h-screen`}
    >
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
          Create Plan
        </h1>
        <p className="text-lg text-center mt-4">
          Plan your fitness journey with AI and personalized assistance.
        </p>

        <div className="flex space-x-10 mt-10">
          {/* Humanoid Section */}
          <div className="flex flex-col items-center w-56 h-56 rounded-full border-2 border-gray-300 p-6">
            <Image src="/humanoid.svg" alt="Humanoid" width={80} height={80} />
            <p className="mt-4 font-semibold">Fit AI Assistant</p>
            <StatusChip
              status={
                isSpeaking ? "speaking" : callActive ? "listening" : "waiting"
              }
            />
          </div>

          {/* User Section */}
          <div className="flex flex-col items-center w-56 h-56 rounded-full border-2 border-gray-300 p-6">
            <Image src="/user-male.svg" alt="User" width={80} height={80} />
            <p className="mt-4 font-semibold">You</p>
            <StatusChip status={callActive ? "inCall" : "ready"} />
          </div>
        </div>

        {connecting && <p className="mt-2">Connecting...</p>}

        {!callActive && !connecting && (
          <button
            className="mt-10 px-4 py-2 bg-blue-600 text-white rounded flex items-center space-x-2 hover:bg-blue-700"
            onClick={toggleCall}
          >
            <Image src="/phone.svg" alt="Phone" width={16} height={16} />
            <span>Start Call</span>
          </button>
        )}

        {callActive && !connecting && (
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded flex items-center space-x-2 hover:bg-red-700"
            onClick={toggleCall}
          >
            <Image src="/phone-cut.svg" alt="End Call" width={16} height={16} />
            <span>End Call</span>
          </button>
        )}
      </div>

      {/* Right Side */}
      {messages.length > 0 && (
        <div
          className="overflow-y-auto h-screen p-6 pt-20 border-l border-gray-600 -mt-24"
          ref={messagesContainerRef}
        >
          <h2 className="text-xl font-bold mb-4">Transcript</h2>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 p-3 rounded-lg ${
                message.role === "assistant"
                  ? "bg-gray-900 text-gray-200"
                  : "bg-blue-900 text-blue-200"
              }`}
            >
              <Image
                src={
                  message.role === "assistant"
                    ? "/humanoid.svg"
                    : "/user-male.svg"
                }
                alt={message.role === "assistant" ? "Assistant" : "User"}
                width={40}
                height={40}
                className="mr-3"
              />
              <p className="text-inherit">{message.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

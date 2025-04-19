export default function StatusChip({
  status,
}: {
  status: "busy" | "waiting" | "ready" | "speaking" | "inCall" | "listening";
}) {
  const statusStyles = {
    busy: {
      bgColor: "bg-red-200",
      textColor: "text-red-800",
      dotColor: "bg-red-800",
      text: "Busy",
    },
    waiting: {
      bgColor: "bg-yellow-200",
      textColor: "text-yellow-800",
      dotColor: "bg-yellow-800",
      text: "Waiting",
    },
    ready: {
      bgColor: "bg-green-200",
      textColor: "text-green-800",
      dotColor: "bg-green-800",
      text: "Ready",
    },
    speaking: {
      bgColor: "bg-blue-200",
      textColor: "text-blue-800",
      dotColor: "bg-blue-800",
      text: "Speaking",
    },
    inCall: {
      bgColor: "bg-purple-200",
      textColor: "text-purple-800",
      dotColor: "bg-purple-800",
      text: "In Call",
    },
    listening: {
      bgColor: "bg-orange-200",
      textColor: "text-orange-800",
      dotColor: "bg-orange-800",
      text: "Listening",
    },
  };

  const { bgColor, textColor, dotColor, text } = statusStyles[status];

  return (
    <span
      className={`px-3 py-1 ${bgColor} ${textColor} text-sm rounded-full mt-2`}
    >
      <span
        className={`inline-block w-2 h-2 ${dotColor} rounded-full mr-2`}
      ></span>
      {text}
    </span>
  );
}

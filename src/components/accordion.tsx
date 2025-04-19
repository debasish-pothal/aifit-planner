import { useState } from "react";

export default function Accordion({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className="border border-gray-600 rounded-md overflow-hidden bg-gray-800 w-full mt-4">
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-700 hover:bg-gray-600 transition"
      >
        <span className="text-left font-medium text-gray-200 flex-1">
          {title}
        </span>
        {subTitle && (
          <span className="text-sm text-gray-400 ml-auto mr-4">{subTitle}</span>
        )}
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-120" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 bg-gray-900 border-t border-gray-700 text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
}

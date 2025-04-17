import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-[0_4px_6px_-1px_rgba(0,0,139,0.5)]">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="AI Fit Planner Logo"
            width={40}
            height={40}
          />
        </Link>
      </div>
      <div className="space-x-4 flex items-center">
        <Link href="/create-plan" className="flex items-center hover:underline">
          <Image
            src="/create.svg"
            alt="Create Icon"
            width={20}
            height={20}
            className="mr-2"
          />
          Create
        </Link>
        <Link href="/my-profile" className="flex items-center hover:underline">
          <Image
            src="/profile.svg"
            alt="Profile Icon"
            width={20}
            height={20}
            className="mr-2"
          />
          Profile
        </Link>
      </div>
    </nav>
  );
}

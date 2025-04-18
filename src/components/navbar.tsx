"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

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
        {isSignedIn ? (
          <>
            <Link
              href="/create-plan"
              className="flex items-center hover:underline"
            >
              <Image
                src="/create.svg"
                alt="Create Icon"
                width={20}
                height={20}
                className="mr-2"
              />
              Create
            </Link>
            <Link
              href="/my-profile"
              className="flex items-center hover:underline"
            >
              <Image
                src="/profile.svg"
                alt="Profile Icon"
                width={20}
                height={20}
                className="mr-2"
              />
              Profile
            </Link>
            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              className="flex items-center hover:underline hover:cursor-pointer"
            >
              <Image
                src="/logout.svg"
                alt="Logout Icon"
                width={30}
                height={30}
              />
            </button>
          </>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="px-4 py-2 border border-blue-700 text-blue-600 rounded hover:bg-blue-600 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 bg-blue-500 border border-blue-700 text-white rounded hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

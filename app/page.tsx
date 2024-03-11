'use client'

import { LogOutButton } from "@/src/components/Buttons/LogOutButton";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const {data} = useSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div>
    </main>
  );
}

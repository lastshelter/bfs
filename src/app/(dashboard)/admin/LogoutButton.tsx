"use client";

import React from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton(): React.JSX.Element {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg bg-slate-900/50 backdrop-blur-sm transition-all cursor-pointer"
    >
      Log Out
    </button>
  );
}

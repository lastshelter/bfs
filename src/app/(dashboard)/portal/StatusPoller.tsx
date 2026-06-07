"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StatusPoller(): React.JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  return <></>;
}

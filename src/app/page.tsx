"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname === "/") {
      router.push("/projects");
    }
  }, [router]);

  return null;
}

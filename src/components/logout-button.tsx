"use client";

import { useRouter } from "next/navigation";
import { Button } from "src/components";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    router.push("/login");
  };

  return (
    <Button
      variant="destructive"
      onClick={handleLogout}
      className="cursor-pointer"
    >
      Logout
    </Button>
  );
}

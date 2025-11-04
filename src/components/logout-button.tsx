"use client";

import { useRouter } from "next/navigation";
import { Button } from "src/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/;";
    router.push("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      className="cursor-pointer rounded-xl bg-linear-to-r from-red-500 to-red-600 text-white px-6 py-2 text-sm font-semibold shadow-md hover:from-red-600 hover:to-red-700 active:scale-95 transition-all duration-200"
    >
      Logout
    </Button>
  );
}

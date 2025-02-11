"use client"
import { useAuthStore } from "@/store/auth-store";

  
export default function Page() {
const user = useAuthStore((state)=> state.user)
return (
    <div>
    {user?.id}
    </div>
);
}
  
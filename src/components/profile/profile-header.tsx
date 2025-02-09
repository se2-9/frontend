import { useAuthStore } from "@/store/auth-store";

export default function ProfileHeader() {
    const currentUser = useAuthStore((state)=>state.user)
    return (
        <div className="space-y-2 w-full mx-auto px-4 text-text">
            <span>
            Email: {currentUser?.email}
            </span>
        </div>
        
    );
}

// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";

import { useAuthStore } from "@/store/auth-store";

export default function ProfileHeader() {
    const currentUser = useAuthStore((state)=>state.user)
    return (
        <div>
            <div>
                Email
            </div>
            <div>
                {currentUser?.email}
            </div>
        </div>
        
    );
}

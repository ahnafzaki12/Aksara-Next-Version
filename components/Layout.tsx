import { ReactNode } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./Nav";

export default function Layout({ children }: { children: ReactNode }) {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen flex flex-col">
            <Nav />
            <div className="flex-1 p-6">
                <div className="min-h-full p-8">
                    {children}
                </div>
            </div>
        </div>
    );

}
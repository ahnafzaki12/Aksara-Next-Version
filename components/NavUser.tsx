"use client"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation"; // Gantikan router.pathname

const NavUser = () => {
    const pathname = usePathname(); // Lebih stabil untuk client-side
    const { data: session, status } = useSession();

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname?.startsWith(path);
    }

    async function logout() {
        await signOut({ callbackUrl: '/' });
    }

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Campaign", href: "/campaign" },
        { name: "Profile", href: "/profile" },
    ];

    return (
        <nav className="border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-gray-900/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href="/"
                        className="text-xl font-bold text-white hover:text-green-400 transition-colors duration-200"
                    >
                        AksaraPeduli
                    </Link>

                    <div className="flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    px-4 py-2 rounded-lg text-sm font-medium
                                    transition-all duration-200 ease-in-out
                                    hover:bg-gray-800 hover:scale-105
                                    ${isActive(item.href)
                                        ? 'text-green-400 bg-gray-800 shadow-sm'
                                        : 'text-gray-300 hover:text-white'}
                                `}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="ml-4 pl-4 border-l border-gray-200">
                            {status === "authenticated" ? (
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-red-500 hover:bg-red-100 rounded-full transition-all duration-200"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-blue-500 hover:bg-blue-100 rounded-full transition-all duration-200"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavUser;

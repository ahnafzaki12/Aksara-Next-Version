import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Nav() {
    const router = useRouter();
    const { pathname } = router;
    const { data: session, status } = useSession();

    if (status === "loading") {
        return null; // atau tampilkan loader
    }

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname.includes(path);
    };

    async function logout() {
        await signOut({ callbackUrl: '/' });
    }

    console.log("status:", status);
console.log("session:", session);

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/admin"
                        className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                    >
                        Aksara Peduli
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-1">
                        <Link
                            href="/admin"
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive('/')
                                ? 'bg-blue-50 text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/campaigns"
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive('/campaigns')
                                ? 'bg-blue-50 text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Campaigns
                        </Link>

                        <Link
                            href="/admin/settings"
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive('/settings')
                                ? 'bg-blue-50 text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Settings
                        </Link>


                        <div className="ml-4 pl-4 border-l border-gray-200">
                            {status === "authenticated" ? (
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    )
}
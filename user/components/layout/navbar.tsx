import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-4">
                <Link href="/" className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                   CD IELTS Mock
                </Link>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-base">
                    <Link href="/">
                        <Button
                            variant="link"
                            className="text-white hover:text-pink-200 hover:scale-105 transition-all duration-200 p-0 font-semibold"
                        >
                            Home
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button
                            variant="link"
                            className="text-white hover:text-pink-200 hover:scale-105 transition-all duration-200 p-0 font-semibold"
                        >
                            About
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button
                            variant="link"
                            className="text-white hover:text-pink-200 hover:scale-105 transition-all duration-200 p-0 font-semibold"
                        >
                            Contact
                        </Button>
                    </Link>
                    <Link href="/faq">
                        <Button
                            variant="link"
                            className="text-white hover:text-pink-200 hover:scale-105 transition-all duration-200 p-0 font-semibold"
                        >
                            FAQs
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
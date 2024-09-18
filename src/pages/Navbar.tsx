import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-slate-900 text-white shadow-sm transition-shadow duration-300 ease-in-out">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="#" className="text-lg font-bold">
          John Doe
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link to="#" className="text-sm font-medium hover:text-gray-400">
            Home
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-gray-400">
            About
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-gray-400">
            Projects
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-gray-400">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

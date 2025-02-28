import { Shield } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Checking
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Savings
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Credit Cards
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Loans
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Investments
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Rates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Mobile App
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-emerald-400" />
            <span className="text-lg font-bold">SecureBank</span>
          </div>
          <p className="text-sm text-zinc-500">
            © 2025 SecureBank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

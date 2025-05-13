import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 border-t border-border mt-20 relative">
      <div className="absolute inset-0 bg-[url('/window.svg')] bg-repeat opacity-10 mix-blend-overlay"></div>
      <div className="container mx-auto px-4 py-12 relative z-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-white">Company Name</h3>
            <p className="text-white/80">Making learning accessible for everyone.</p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-white/70 hover:text-white hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </Link>
              <Link href="#" className="text-white/70 hover:text-white hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </Link>
              <Link href="#" className="text-white/70 hover:text-white hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
              <li><Link href="/about" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">About</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Contact</Link></li>
              <li><Link href="/faq" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/reading" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Reading</Link></li>
              <li><Link href="/listening" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Listening</Link></li>
              <li><Link href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Blog</Link></li>
              <li><Link href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block">Resources</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Stay Updated</h4>
            <p className="text-white/80 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex">
              <input type="email" placeholder="Email address" className="px-4 py-2 w-full rounded-l-md bg-white/10 border border-r-0 border-white/20 focus:outline-none text-white placeholder:text-white/50" />
              <button className="bg-white text-indigo-700 px-4 py-2 rounded-r-md hover:bg-white/90 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-10 pt-8 text-center text-white/70">
          <p>&copy; {currentYear} Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
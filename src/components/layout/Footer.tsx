import React from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-black/30 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-white/80">
    
        <p className="text-sm">
          © {year} <span className="font-semibold text-white">ProjectFlow</span>. All rights reserved.
        </p>

        <p className="text-sm mt-2 sm:mt-0">
          Built with ❤️ using React & TypeScript
        </p>

       
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="GitHub"
          >
            <FiGithub className="w-5 h-5" />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="w-5 h-5" />
          </a>

          <a
            href="mailto:support@projectflow.com"
            className="hover:text-white transition"
            aria-label="Email"
          >
            <FiMail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

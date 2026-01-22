import { FiFolder } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import type { FC } from "react";

const Footer:FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
          <div>
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-lg">
                <FiFolder className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">ProjectFlow</h2>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              ProjectFlow helps teams manage projects efficiently with
              role-based access, audit logs, and real-time collaboration.
            </p>

            <div className="flex items-center gap-4">
              <a className="footer-icon" href="#">
                <FaTwitter />
              </a>
              <a className="footer-icon" href="#">
                <FaGithub />
              </a>
              <a className="footer-icon" href="#">
                <FaLinkedin />
              </a>
            </div>
          </div>

         
          <div>
            <h3 className="footer-title">Product</h3>
            <ul className="footer-list">
              <li>Project Management</li>
              <li>User Roles</li>
              <li>Audit Logs</li>
              <li>API Access</li>
            </ul>
          </div>

        
          <div>
            <h3 className="footer-title">Company</h3>
            <ul className="footer-list">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>

     
          <div>
            <h3 className="footer-title">Support</h3>
            <ul className="footer-list">
              <li>Help Center</li>
              <li>Contact Support</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

       
        <div className="border-t border-gray-700 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} ProjectFlow. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-gray-400">
              <span className="hover:text-white cursor-pointer">Privacy</span>
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </div>

    
      <style>
        {`
          .footer-title {
            @apply text-lg font-semibold mb-4;
          }

          .footer-list li {
            @apply text-gray-300 text-sm mb-2 hover:text-white cursor-pointer transition;
          }

          .footer-icon {
            @apply h-10 w-10 rounded-lg bg-gray-700 flex items-center justify-center 
                   hover:bg-indigo-600 transition text-lg;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;

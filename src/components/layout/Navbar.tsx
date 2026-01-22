/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { logout as logoutAction } from "../../redux/store/store.authSlice";
import { useLogoutMutation } from "../../redux/features/auth/auth.api";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { FiMenu, FiX, FiChevronDown, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);


  const primaryColor = "bg-blue-700";
  const primaryHover = "hover:bg-blue-800";
  const primaryLight = "bg-blue-50";
  const secondaryColor = "text-indigo-600";
 
  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } finally {
      dispatch(logoutAction());
      navigate("/login");
    }
  };

 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseLinkClass = `px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ease-in-out text-gray-700 hover:text-blue-700 relative group`;
  
  const activeLinkClass = `px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ease-in-out ${primaryColor} text-white`;
  
 

  return (
    <>
      <nav 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg" 
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
        
            <div className="flex items-center">
              <div className="shrink-0 flex items-center">
                <span className={`text-2xl font-bold ${secondaryColor}`}>
                  ProjectFlow
                </span>
                
              </div>

         
              <div className="hidden md:ml-10 md:flex md:items-center md:space-x-1">
                {isAuthenticated && (
                  <>
                    

                    <NavLink 
                      to="/" 
                      className={({ isActive }) => isActive ? activeLinkClass : baseLinkClass}
                    >
                      Home
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-4/5 transition-all duration-300"></span>
                    </NavLink>
                    <NavLink 
                      to="/projects" 
                      className={({ isActive }) => isActive ? activeLinkClass : baseLinkClass}
                    >
                      Projects
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-4/5 transition-all duration-300"></span>
                    </NavLink>

                    {user?.role === "ADMIN" && (
                      <>
                        <div className="relative group">
                          <button className="flex items-center px-4 py-2.5 rounded-lg font-medium text-gray-700 hover:text-blue-700 transition-all duration-300">
                            Admin
                            <FiChevronDown className="ml-1.5 transition-transform duration-300 group-hover:rotate-180" />
                          </button>
                          <div className="absolute left-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-10">
                            <div className="py-2">
                              <NavLink 
                                to="/users" 
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                              >
                                <div className="flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                                  User Management
                                </div>
                              </NavLink>
                              <NavLink 
                                to="/invite" 
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                              >
                                <div className="flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3"></div>
                                  Invite User
                                </div>
                              </NavLink>
                              <NavLink 
                                to="/projects-management" 
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                              >
                                <div className="flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3"></div>
                                    Project Management
                                </div>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

          
            <div className="hidden md:flex md:items-center md:space-x-4">
              {isAuthenticated ? (
                <>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-3 px-4 py-2 rounded-full border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white text-sm font-semibold">
                        {user?.email?.charAt(0).toUpperCase() || <FiUser />}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
                      </div>
                      <FiChevronDown className={`transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                    </button>
                    
                   
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg border border-gray-100 z-10">
                        <div className="py-2">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                            <p className="text-xs text-gray-500 mt-0.5 capitalize">{user?.role?.toLowerCase()}</p>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3"></div>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className={`px-6 py-2.5 rounded-lg font-medium text-white ${primaryColor} ${primaryHover} shadow-md hover:shadow-lg transition-all duration-300 flex items-center`}
                >
                  Sign In
                  <span className="ml-2">→</span>
                </NavLink>
              )}
            </div>

          
            <div className="md:hidden flex items-center">
              {isAuthenticated && (
                <div className="mr-4 flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white text-sm font-semibold mr-2">
                    {user?.email?.charAt(0).toUpperCase() || <FiUser />}
                  </div>
                  <span className="text-sm text-gray-700 font-medium truncate max-w-25">
                    {user?.email?.split('@')[0]}
                  </span>
                </div>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${primaryLight} text-gray-700 hover:text-blue-700 transition-colors`}
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

   
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-inner">
            <div className="px-4 pt-4 pb-6 space-y-1">
              {isAuthenticated && (
                <>
                  <div className="px-4 py-3 mb-2 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
                  </div>
                  
                  
                  
                  <NavLink 
                    to="/" 
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-4 py-3 rounded-lg font-medium transition-all ${
                        isActive 
                          ? `${primaryColor} text-white` 
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink 
                    to="/projects" 
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `block px-4 py-3 rounded-lg font-medium transition-all ${
                        isActive 
                          ? `${primaryColor} text-white` 
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    Projects
                  </NavLink>

                  {user?.role === "ADMIN" && (
                    <>
                      <div className="pt-2 border-t border-gray-100 mt-2">
                        <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Admin Panel
                        </p>
                        <NavLink 
                          to="/users" 
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
                        >
                          User Management
                        </NavLink>
                        <NavLink 
                          to="/invite" 
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
                        >
                          Invite User
                        </NavLink>
                        <NavLink 
                          to="/projects-management" 
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
                        >
                          Project Management
                        </NavLink>
                      </div>
                    </>
                  )}
                  
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 rounded-lg font-medium text-white bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all shadow-sm flex items-center justify-center"
                    >
                      Logout
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </>
              )}
              
              {!isAuthenticated && (
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium text-white text-center ${primaryColor} ${primaryHover} shadow-md`}
                >
                  Sign In
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
      
    
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
}
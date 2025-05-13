"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  ChevronDown,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string | number;
  badgeColor?: string;
  children?: { name: string; href: string; badge?: string | number; badgeColor?: string }[];
}

const navigation: NavItem[] = [
  {
    name: 'Readings',
    href: '/dashboard/reading',
    icon: BookOpen
  },
  {
    name: 'Listening',
    href: '/dashboard/listening',
    icon: LayoutDashboard
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});
  const [sidebarTheme, setSidebarTheme] = useState<'light' | 'gradient' | 'dark'>('gradient');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Auto-open the section for the active navigation item
  useEffect(() => {
    const activeSection = navigation.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
    );
    
    if (activeSection && activeSection.children) {
      setOpenSections((prev) => ({
        ...prev,
        [activeSection.name]: true,
      }));
    }
  }, [pathname]);
  
  const toggleSection = (name: string) => {
    setOpenSections(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const cycleSidebarTheme = () => {
    if (sidebarTheme === 'light') setSidebarTheme('gradient');
    else if (sidebarTheme === 'gradient') setSidebarTheme('dark');
    else setSidebarTheme('light');
  };
  
  const getSidebarClasses = () => {
    switch(sidebarTheme) {
      case 'gradient':
        return "bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-900 text-white";
      case 'dark':
        return "bg-gray-900 text-white";
      default:
        return "bg-white text-gray-800 border-r border-gray-100";
    }
  };
  
  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden lg:block w-64 min-h-[calc(100vh-64px)] shadow-lg overflow-y-auto transition-all duration-300",
          getSidebarClasses()
        )}
      >
        <div className="py-1">
          {/* User profile section */}
          <div className={cn(
            "mx-3 mb-6 p-4 rounded-lg flex items-center",
            sidebarTheme === 'light' ? "bg-blue-50" : "bg-black/20"
          )}>
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-700 text-white font-medium">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className={cn(
                "font-medium text-sm",
                sidebarTheme === 'light' ? "text-blue-900" : "text-white"
              )}>
                Admin User
              </p>
              <p className={cn(
                "text-xs",
                sidebarTheme === 'light' ? "text-blue-700/70" : "text-blue-100/70"
              )}>
                Administrator
              </p>
            </div>
          </div>
          
          {/* Theme toggle */}
          <div className="flex justify-between items-center px-4 mb-4">
            <h2 className={cn(
              "text-xs font-semibold uppercase tracking-wider",
              sidebarTheme === 'light' ? "text-gray-500" : "text-blue-100/70"
            )}>
              Navigation
            </h2>
            <button 
              onClick={cycleSidebarTheme}
              className={cn(
                "p-1.5 rounded-md text-xs",
                sidebarTheme === 'light' 
                  ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
                  : "bg-white/10 text-blue-100 hover:bg-white/20"
              )}
            >
              Theme
            </button>
          </div>
          
          <nav className="space-y-0.5 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isOpen = openSections[item.name] || false;
              
              return (
                <div key={item.name} className="mt-1 first:mt-0">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleSection(item.name)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200",
                          isActive
                            ? sidebarTheme === 'light'
                              ? "bg-blue-50 text-blue-700"
                              : "bg-white/10 text-white"
                            : sidebarTheme === 'light'
                              ? "text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                              : "text-gray-100 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <div className="flex items-center">
                          <div className={cn(
                            "mr-3 p-1 rounded-md",
                            isActive
                              ? sidebarTheme === 'light'
                                ? "bg-blue-100 text-blue-700"
                                : "bg-white/20 text-white"
                              : sidebarTheme === 'light'
                                ? "text-gray-500 group-hover:text-blue-600"
                                : "text-blue-200 group-hover:text-white"
                          )}>
                            <item.icon className="h-4 w-4" />
                          </div>
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center">
                          {item.badge && (
                            <span className={cn(
                              "mr-2 px-1.5 py-0.5 text-xs rounded-full",
                              item.badgeColor || 
                                (sidebarTheme === 'light' ? "bg-blue-100 text-blue-700" : "bg-white/20 text-white")
                            )}>
                              {item.badge}
                            </span>
                          )}
                          <ChevronDown 
                            className={cn(
                              "h-4 w-4 transition-transform", 
                              isOpen ? "transform rotate-180" : ""
                            )} 
                          />
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div 
                          className={cn(
                            "ml-7 space-y-0.5 mt-1 relative before:absolute before:left-2.5 before:top-1 before:h-[calc(100%-16px)] before:w-px",
                            sidebarTheme === 'light' ? "before:bg-gray-200" : "before:bg-white/20"
                          )}
                        >
                          {item.children.map(child => {
                            const isChildActive = pathname === child.href;
                            
                            return (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={cn(
                                  "flex items-center justify-between pl-5 pr-3 py-2 text-sm rounded-md transition-colors",
                                  isChildActive
                                    ? sidebarTheme === 'light'
                                      ? "text-blue-700 bg-blue-50 font-medium"
                                      : "bg-white/10 text-white font-medium"
                                    : sidebarTheme === 'light'
                                      ? "text-gray-600 hover:text-blue-700 hover:bg-gray-50"
                                      : "text-gray-100 hover:text-white hover:bg-white/5"
                                )}
                              >
                                <div className="flex items-center">
                                  <span className={cn(
                                    "h-1.5 w-1.5 rounded-full mr-3",
                                    isChildActive
                                      ? sidebarTheme === 'light' ? "bg-blue-500" : "bg-white"
                                      : sidebarTheme === 'light' ? "bg-gray-300" : "bg-white/40"
                                  )}></span>
                                  {child.name}
                                </div>
                                
                                {child.badge && (
                                  <span className={cn(
                                    "px-1.5 py-0.5 text-xs rounded-full",
                                    child.badgeColor || 
                                      (sidebarTheme === 'light' ? "bg-gray-100 text-gray-600" : "bg-white/10 text-gray-100")
                                  )}>
                                    {child.badge}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200",
                        isActive
                          ? sidebarTheme === 'light'
                            ? "bg-blue-50 text-blue-700"
                            : "bg-white/10 text-white"
                          : sidebarTheme === 'light'
                            ? "text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                            : "text-gray-100 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <div className="flex items-center">
                        <div className={cn(
                          "mr-3 p-1 rounded-md",
                          isActive
                            ? sidebarTheme === 'light'
                              ? "bg-blue-100 text-blue-700"
                              : "bg-white/20 text-white"
                            : sidebarTheme === 'light'
                              ? "text-gray-500 group-hover:text-blue-600"
                              : "text-blue-200 group-hover:text-white"
                        )}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span>{item.name}</span>
                      </div>
                      
                      {item.badge && (
                        <span className={cn(
                          "px-1.5 py-0.5 text-xs rounded-full",
                          item.badgeColor || 
                            (sidebarTheme === 'light' ? "bg-blue-100 text-blue-700" : "bg-white/20 text-white")
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
          
          {/* Bottom section */}
          <div className="px-2 mt-4 mb-6 space-y-1">
            <button
              className={cn(
                "flex items-center w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                sidebarTheme === 'light'
                  ? "text-red-600 hover:bg-red-50"
                  : "text-red-300 hover:bg-red-500/10 hover:text-red-200"
              )}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
      
      {/* Mobile sidebar trigger and overlay */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open Menu"
        >
          <LayoutDashboard size={20} />
        </button>
      </div>
      
      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <aside 
            className={cn(
              "fixed top-0 left-0 bottom-0 w-[270px] z-50 overflow-y-auto transition-transform transform-gpu lg:hidden shadow-xl",
              getSidebarClasses()
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded flex items-center justify-center text-white text-lg font-bold">
                  IM
                </div>
                <span className="ml-2 font-bold text-white">IELTS Mock Admin</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-md bg-white/10 text-white hover:bg-white/20"
              >
                ✕
              </button>
            </div>
            
            {/* Same content as desktop sidebar */}
            <div className="py-4">
              {/* User profile section */}
              <div className={cn(
                "mx-3 mb-6 p-4 rounded-lg flex items-center",
                "bg-black/20"
              )}>
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-700 text-white font-medium">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="font-medium text-sm text-white">
                    Admin User
                  </p>
                  <p className="text-xs text-blue-100/70">
                    Administrator
                  </p>
                </div>
              </div>
              
              <nav className="space-y-0.5 px-2">
                {/* Same navigation as desktop sidebar */}
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const isOpen = openSections[item.name] || false;
                  
                  return (
                    <div key={item.name} className="mt-1 first:mt-0">
                      {item.children ? (
                        <div>
                          <button
                            onClick={() => toggleSection(item.name)}
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200",
                              isActive
                                ? "bg-white/10 text-white"
                                : "text-gray-100 hover:bg-white/5 hover:text-white"
                            )}
                          >
                            <div className="flex items-center">
                              <div className={cn(
                                "mr-3 p-1 rounded-md",
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "text-blue-200 group-hover:text-white"
                              )}>
                                <item.icon className="h-4 w-4" />
                              </div>
                              <span>{item.name}</span>
                            </div>
                            <div className="flex items-center">
                              {item.badge && (
                                <span className={cn(
                                  "mr-2 px-1.5 py-0.5 text-xs rounded-full",
                                  item.badgeColor || "bg-white/20 text-white"
                                )}>
                                  {item.badge}
                                </span>
                              )}
                              <ChevronDown 
                                className={cn(
                                  "h-4 w-4 transition-transform", 
                                  isOpen ? "transform rotate-180" : ""
                                )} 
                              />
                            </div>
                          </button>
                          
                          {isOpen && (
                            <div 
                              className={cn(
                                "ml-7 space-y-0.5 mt-1 relative before:absolute before:left-2.5 before:top-1 before:h-[calc(100%-16px)] before:w-px before:bg-white/20"
                              )}
                            >
                              {item.children.map(child => {
                                const isChildActive = pathname === child.href;
                                
                                return (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    className={cn(
                                      "flex items-center justify-between pl-5 pr-3 py-2 text-sm rounded-md transition-colors",
                                      isChildActive
                                        ? "bg-white/10 text-white font-medium"
                                        : "text-gray-100 hover:text-white hover:bg-white/5"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <div className="flex items-center">
                                      <span className={cn(
                                        "h-1.5 w-1.5 rounded-full mr-3",
                                        isChildActive ? "bg-white" : "bg-white/40"
                                      )}></span>
                                      {child.name}
                                    </div>
                                    
                                    {child.badge && (
                                      <span className="px-1.5 py-0.5 text-xs rounded-full bg-white/10 text-gray-100">
                                        {child.badge}
                                      </span>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200",
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-gray-100 hover:bg-white/5 hover:text-white"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            <div className={cn(
                              "mr-3 p-1 rounded-md",
                              isActive
                                ? "bg-white/20 text-white"
                                : "text-blue-200 group-hover:text-white"
                            )}>
                              <item.icon className="h-4 w-4" />
                            </div>
                            <span>{item.name}</span>
                          </div>
                          
                          {item.badge && (
                            <span className={cn(
                              "px-1.5 py-0.5 text-xs rounded-full",
                              item.badgeColor || "bg-white/20 text-white"
                            )}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
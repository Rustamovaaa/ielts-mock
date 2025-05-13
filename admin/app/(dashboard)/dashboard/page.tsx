"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, BookOpen, Headphones, ChevronRight, BarChart3, CheckCircle2, Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back to your IELTS Mock Admin Dashboard
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition-colors">
            Export Data
          </button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="pb-2 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-gray-700">Reading Tests</CardTitle>
              <div className="p-1.5 rounded-full bg-gray-100 text-gray-700">
                <BookOpen size={16} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-semibold text-gray-900">24</p>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <span className="flex items-center text-gray-700">
                    <ArrowUpRight size={14} />
                    12%
                  </span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </div>
              <div className="h-8 w-20 bg-gray-100 rounded-md flex items-end overflow-hidden">
                <div className="bg-gray-400 w-3 h-4 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-6 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-5 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-8 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-7 rounded-sm mx-0.5"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="pb-2 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-gray-700">Listening Tests</CardTitle>
              <div className="p-1.5 rounded-full bg-gray-100 text-gray-700">
                <Headphones size={16} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-semibold text-gray-900">18</p>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <span className="flex items-center text-gray-700">
                    <ArrowUpRight size={14} />
                    8%
                  </span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </div>
              <div className="h-8 w-20 bg-gray-100 rounded-md flex items-end overflow-hidden">
                <div className="bg-gray-400 w-3 h-6 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-5 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-3 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-8 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-4 rounded-sm mx-0.5"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="pb-2 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-gray-700">Active Users</CardTitle>
              <div className="p-1.5 rounded-full bg-gray-100 text-gray-700">
                <Users size={16} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-semibold text-gray-900">1,234</p>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <span className="flex items-center text-gray-700">
                    <ArrowUpRight size={14} />
                    24%
                  </span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </div>
              <div className="h-8 w-20 bg-gray-100 rounded-md flex items-end overflow-hidden">
                <div className="bg-gray-400 w-3 h-4 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-7 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-8 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-8 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-7 rounded-sm mx-0.5"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="pb-2 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-gray-700">Test Completion</CardTitle>
              <div className="p-1.5 rounded-full bg-gray-100 text-gray-700">
                <BarChart3 size={16} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-semibold text-gray-900">78.5%</p>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  <span className="flex items-center text-gray-700">
                    <ArrowDownRight size={14} />
                    3%
                  </span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </div>
              <div className="h-8 w-20 bg-gray-100 rounded-md flex items-end overflow-hidden">
                <div className="bg-gray-400 w-3 h-9 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-7 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-8 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-6 rounded-sm mx-0.5"></div>
                <div className="bg-gray-400 w-3 h-5 rounded-sm mx-0.5"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4 border border-gray-100 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium text-gray-800">Tests Analytics</CardTitle>
              <CardDescription className="text-gray-500">Monthly test completion rates</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-xs text-gray-500">Reading</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <span className="text-xs text-gray-500">Listening</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="h-72 w-full bg-gray-50 rounded-md p-4 flex items-end justify-between">
              {Array.from({length: 12}).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-full">
                  <div className="relative w-full h-56 flex flex-col items-center justify-end">
                    <div 
                      className="w-full max-w-[16px] bg-gray-400 rounded-t-sm"
                      style={{ height: `${Math.floor(Math.random() * 100) + 20}%` }}
                    ></div>
                    <div 
                      className="w-full max-w-[16px] bg-gray-600 rounded-t-sm -ml-2 absolute bottom-0"
                      style={{ height: `${Math.floor(Math.random() * 80) + 10}%`, opacity: 0.8 }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{String.fromCharCode(74 - i)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3 border border-gray-100 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-gray-800">Recent Activities</CardTitle>
              <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <CardDescription className="text-gray-500">Latest activity on the platform</CardDescription>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="space-y-3">
              {[
                { text: "New reading test uploaded: Academic Reading Test 8", icon: CheckCircle2, time: "2 hours ago", isNew: true },
                { text: "User feedback submitted for Listening Test 12", icon: Users, time: "4 hours ago", isNew: true },
                { text: "System update completed successfully", icon: CheckCircle2, time: "Yesterday", isNew: false },
                { text: "5 new users registered", icon: Users, time: "Yesterday", isNew: false },
                { text: "Listening Test 11 needs review", icon: Clock, time: "2 days ago", isNew: false },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="p-1.5 rounded-full bg-gray-100 text-gray-600 mt-0.5">
                    <item.icon size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 font-medium">{item.text}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                  </div>
                  {item.isNew && <span className="h-2 w-2 rounded-full bg-gray-400"></span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
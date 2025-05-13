import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Headphones, BookOpen, Award, BarChart3 } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative overflow-hidden py-20 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
            {/* Animated Shapes Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" 
                    style={{ animationDelay: '1s', animationDuration: '7s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" 
                    style={{ animationDelay: '2s', animationDuration: '8s' }} />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" 
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 0V20M0 1H20\' stroke=\'white\' stroke-width=\'1\'/%3E%3C/svg%3E")' }}/>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Content - Text */}
                    <div className="flex-1 text-center lg:text-left max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-1 mb-6">
                            <span className="animate-pulse relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-sm font-medium text-blue-500">Free IELTS Practice Tests</span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Master Your IELTS Exam
                        </h1>
                        
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl">
                            Improve your skills with our authentic practice tests and boost your confidence for the real exam with detailed feedback and scoring.
                        </p>
                        
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90 text-white px-8 py-6 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:translate-y-[-2px]">
                                <Link href="/listening">
                                    <Headphones className="w-5 h-5" />
                                    Start Listening Test
                                </Link>
                            </Button>
                            <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white px-8 py-6 rounded-xl flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:translate-y-[-2px]">
                                <Link href="/reading">
                                    <BookOpen className="w-5 h-5" />
                                    Start Reading Test
                                </Link>
                            </Button>
                        </div>
                    </div>
                    
                    {/* Right Content - Visual Element */}
                    <div className="flex-1 relative">
                        <div className="relative bg-gradient-to-br from-slate-900/5 to-slate-900/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
                            <div className="absolute -right-3 -top-3">
                                <div className="relative flex h-6 w-6">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-6 w-6 bg-purple-500"></span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-6">
                                {/* Mock Score Card */}
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-500/10 rounded-lg">
                                        <Award className="w-10 h-10 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl">Band Score Simulation</h3>
                                        <p className="text-slate-500 dark:text-slate-400">Get accurate band predictions</p>
                                    </div>
                                </div>
                                
                                {/* Progress Tracking */}
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-500/10 rounded-lg">
                                        <BarChart3 className="w-10 h-10 text-purple-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl">Detailed Analysis</h3>
                                        <p className="text-slate-500 dark:text-slate-400">Track your improvement</p>
                                    </div>
                                </div>
                                
                                {/* Mock Test Stats */}
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg p-4">
                                        <div className="text-3xl font-bold text-blue-600">40+</div>
                                        <div className="text-sm text-slate-500">Reading Tests</div>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg p-4">
                                        <div className="text-3xl font-bold text-purple-600">35+</div>
                                        <div className="text-sm text-slate-500">Listening Tests</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Floating Elements */}
                        <div className="absolute -left-10 top-1/2 w-20 h-20 bg-blue-500/30 backdrop-blur-xl rounded-full z-[-1]" />
                        <div className="absolute -right-5 bottom-10 w-12 h-12 bg-purple-500/30 backdrop-blur-xl rounded-full z-[-1]" />
                    </div>
                </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full py-2 px-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium">Updated with the latest IELTS patterns</span>
            </div>
        </section>
    );
};

export default Hero;
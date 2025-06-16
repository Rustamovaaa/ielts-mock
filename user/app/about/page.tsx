import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    {/* Background elements */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
                    </div>
                    
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">About Our Platform</span>
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                            Helping Students Excel in IELTS
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            We&apos;re dedicated to providing high-quality practice materials that simulate the real IELTS experience,
                            helping you build skills and confidence for exam day.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <div className="aspect-w-16 aspect-h-9 w-full h-full">
                                    <Image 
                                        src="/students.jpg" 
                                        alt="Students preparing for IELTS"
                                        width={800}
                                        height={600}
                                        className="object-cover w-full h-full"
                                        priority
                                        quality={95}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                                    <p className="text-white text-sm">Students preparing for their IELTS exam</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                We believe that access to quality IELTS preparation materials should be available to everyone. 
                                Our platform was created with a simple mission: to provide authentic practice tests that closely 
                                mirror the real IELTS exam, helping students worldwide achieve their target band scores.
                            </p>
                            <p className="text-slate-600 dark:text-slate-300">
                                By focusing on Reading and Listening sections, we offer specialized practice in these key areas,
                                with detailed feedback and band score predictions to track your progress.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">What Sets Us Apart</h2>
                        <p className="text-slate-600 dark:text-slate-300">
                            Our platform offers several key features designed to optimize your IELTS preparation experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 transition-transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center rounded-xl mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Authentic Test Experience</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Our tests are designed to simulate the real IELTS exam format, timing, and difficulty level,
                                providing you with the most realistic practice experience.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 transition-transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center rounded-xl mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Detailed Analytics</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Receive comprehensive feedback on your performance, including detailed breakdowns of your
                                strengths and areas for improvement.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 transition-transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center rounded-xl mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Extensive Test Library</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Access a growing collection of Reading and Listening tests covering various topics and
                                difficulty levels to ensure comprehensive preparation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>            {/* Team Section */}
            <section className="py-16 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Team</h2>
                        <p className="text-slate-600 dark:text-slate-300">
                            Our platform is created by skilled Web developers, IELTS experts, and educators with years of experience
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                            {/* Team Member 1 */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 text-center">
                                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-slate-200 dark:border-slate-700">
                                    <Image 
                                        src="/avatar-n.jpg" 
                                        alt="Team Member" 
                                        width={96} 
                                        height={96}
                                        className="object-cover w-full h-full"
                                        unoptimized
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-1">Nurkhon Rustamova</h3>
                                <p className="text-blue-600 dark:text-blue-400 mb-3">Front-end developer</p>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">
                                    IELTS certificate holder and front-end developer
                                </p>
                            </div>

                            {/* Team Member 2 */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 text-center">                                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-slate-200 dark:border-slate-700">
                                    <Image 
                                        src="/avatarka-r.jpg" 
                                        alt="Team Member" 
                                        width={96} 
                                        height={96}
                                        className="object-cover w-full h-full"
                                        unoptimized
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-1">Rakhimakhon Yuldasheva</h3>
                                <p className="text-purple-600 dark:text-purple-400 mb-3">IELTS Instructor with 8 band score</p>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">
                                    Experienced IELTS instructor who is passionate about teaching and supporting students
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
                        <h2 className="text-3xl font-bold mb-4">Ready to Improve Your IELTS Score?</h2>
                        <p className="text-white/90 mb-6 max-w-lg mx-auto">
                            Start practicing with our free IELTS mock tests today and take the first step toward achieving your target score.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/reading" className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-xl font-medium transition-colors">
                                Try Reading Test
                            </Link>
                            <Link href="/listening" className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-xl font-medium transition-colors">
                                Try Listening Test
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              Get in Touch With Us
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Have questions about our IELTS mock tests or need assistance? 
              We&apos;re here to help you on your IELTS journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        placeholder="Your first name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      placeholder="Please describe your question or feedback in detail..."
                      required
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div className="flex flex-col gap-8">
                {/* Map or Image */}
                <div className="rounded-2xl overflow-hidden h-64 bg-slate-200 dark:bg-slate-700 shadow-lg">
                  <div className="w-full h-full relative">
                    {/* Placeholder for an actual map integration */}
                    <div className="absolute inset-0 bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
                      <p className="text-slate-500 dark:text-slate-400">Interactive Map Placeholder</p>
                    </div>
                  </div>
                </div>
                
                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Email */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <a href="mailto:support@ieltsmock.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                      support@ieltsmock.com
                    </a>
                  </div>
                  
                  {/* Phone */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                      <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <a href="tel:+1234567890" className="text-purple-600 dark:text-purple-400 hover:underline">
                      +1 (234) 567-890
                    </a>
                  </div>
                  
                  {/* Office */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                      <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-semibold mb-2">Office</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      123 Education Street
                      <br />
                      Language City, LC 10001
                    </p>
                  </div>
                </div>
                
                {/* FAQ Link */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 flex flex-col items-center text-center">
                  <h3 className="text-xl font-semibold mb-2">Have a question?</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Check our FAQ section to see if your question has already been answered.
                  </p>
                  <a 
                    href="/faq" 
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    View FAQ
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Hours Section */}
      <section className="py-12 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Support Hours</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Our support team is available to assist you during the following hours:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold mb-3">Weekdays</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Monday - Friday
                  <br />
                  9:00 AM - 6:00 PM (UTC)
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold mb-3">Weekends</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Saturday
                  <br />
                  10:00 AM - 2:00 PM (UTC)
                </p>
              </div>
            </div>
            
            <p className="mt-6 text-sm text-slate-500">
              Response time: We aim to respond to all inquiries within 24 hours on business days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;


import React, { useState } from 'react';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(email){
            // In a real app, this would call a backend service to subscribe the user.
            console.log(`Subscribing ${email} to new trip announcements.`);
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="bg-gray-800 text-white mt-16">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-blue-400">Egypt <span className="text-orange-400">Travel</span></h3>
                        <p className="mt-2 text-gray-400">Your gateway to exploring the wonders of Egypt.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase">Quick Links</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
                            <li><a href="#/trips" className="hover:text-blue-400 transition-colors">All Trips</a></li>
                            <li><a href="#/store" className="hover:text-blue-400 transition-colors">Travel Store</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase">Support</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold tracking-wider uppercase">New Trip Alerts</h4>
                        <p className="mt-4 text-gray-400">Be the first to know about new tours and exclusive offers.</p>
                        <form onSubmit={handleSubmit} className="mt-4 flex">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                className="w-full px-4 py-2 text-gray-800 bg-gray-200 rounded-l-md focus:outline-none"
                                required
                            />
                            <button type="submit" className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                                Go
                            </button>
                        </form>
                        {subscribed && <p className="text-green-400 mt-2 text-sm">Thank you for subscribing!</p>}
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Egypt Travel. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
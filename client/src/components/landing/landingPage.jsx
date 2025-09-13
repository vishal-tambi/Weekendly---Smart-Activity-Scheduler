import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import Button from '../ui/Button';

const LandingPage = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleGetStarted = () => {
        navigate('/planner');
    };

    const handleViewPlans = () => {
        navigate('/plans');
    };

    const features = [
        {
            icon: 'Zap',
            title: 'Lightning Fast Planning',
            description: 'Create your perfect weekend in under 2 minutes with our intuitive drag-and-drop interface',
            gradient: 'from-yellow-400 to-orange-500'
        },
        {
            icon: 'Sparkles',
            title: 'AI-Powered Suggestions',
            description: 'Get personalized activity recommendations based on weather, mood, and preferences',
            gradient: 'from-purple-400 to-pink-500'
        },
        {
            icon: 'Heart',
            title: 'Mood-Based Matching',
            description: 'Find activities that perfectly align with your energy levels and emotional state',
            gradient: 'from-red-400 to-pink-500'
        },
        {
            icon: 'Compass',
            title: 'Smart Discovery',
            description: 'Explore hidden gems and new experiences tailored to your location and interests',
            gradient: 'from-blue-400 to-cyan-500'
        },
        {
            icon: 'Users',
            title: 'Social Integration',
            description: 'Share plans instantly with friends and family, and collaborate on group activities',
            gradient: 'from-green-400 to-teal-500'
        },
        {
            icon: 'TrendingUp',
            title: 'Progress Tracking',
            description: 'Track your weekend satisfaction and discover patterns in your favorite activities',
            gradient: 'from-indigo-400 to-purple-500'
        }
    ];

    const activityCategories = [
        {
            name: 'Food & Dining',
            icon: 'Coffee',
            color: 'from-orange-400 to-red-500',
            bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
            count: '8 activities'
        },
        {
            name: 'Adventure',
            icon: 'Mountain',
            color: 'from-green-400 to-emerald-500',
            bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
            count: '12 activities'
        },
        {
            name: 'Entertainment',
            icon: 'Film',
            color: 'from-purple-400 to-violet-500',
            bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
            count: '15 activities'
        },
        {
            name: 'Wellness',
            icon: 'Heart',
            color: 'from-pink-400 to-rose-500',
            bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
            count: '6 activities'
        },
        {
            name: 'Social',
            icon: 'Users',
            color: 'from-blue-400 to-indigo-500',
            bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
            count: '10 activities'
        },
        {
            name: 'Creative',
            icon: 'Palette',
            color: 'from-yellow-400 to-amber-500',
            bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50',
            count: '7 activities'
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Weekend Enthusiast",
            content: "Weekendly transformed how I spend my free time. I've discovered amazing activities I never would have thought of!",
            avatar: "SJ",
            rating: 5
        },
        {
            name: "Mike Chen",
            role: "Family Planner",
            content: "Planning family weekends used to be stressful. Now it's actually fun and everyone gets excited about our plans!",
            avatar: "MC",
            rating: 5
        },
        {
            name: "Emma Davis",
            role: "Adventure Seeker",
            content: "The AI suggestions are incredibly smart. It's like having a personal weekend concierge!",
            avatar: "ED",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Enhanced Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <Icons.Calendar className="text-white" size={24} />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Weekendly
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" onClick={handleViewPlans} className="hidden sm:flex">
                                <Icons.BookOpen className="mr-2" size={16} />
                                My Plans
                            </Button>
                            <Button onClick={handleGetStarted} className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700">
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Enhanced Visuals */}
            <div ref={heroRef} className="relative pt-20 pb-32 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                    <div className="absolute inset-0 opacity-40 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                </div>

                {/* Floating Gradient Orbs */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-20 w-28 h-28 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full opacity-20 blur-xl animate-pulse delay-2000"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                    <div className="text-center animate-on-scroll">
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-purple-100 rounded-full text-primary-700 text-sm font-medium mb-8 animate-bounce">
                            <Icons.Sparkles className="mr-2" size={16} />
                            AI-Powered Weekend Planning
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-8">
                            <span className="bg-gradient-to-r from-gray-900 via-primary-600 to-purple-600 bg-clip-text text-transparent">
                                Plan Your Perfect
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                                Weekend
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Transform your weekends into extraordinary experiences with our intelligent planning platform.
                            Choose from 50+ curated activities, get AI-powered suggestions, and create the perfect
                            Saturday-Sunday schedule that matches your mood and energy.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                            <Button
                                size="lg"
                                onClick={handleGetStarted}
                                className="text-lg px-10 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <Icons.Rocket className="mr-3" size={20} />
                                Start Planning Free
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => window.open(
                                    "https://embed.app.guidde.com/playbooks/nsNrvxDax9jXhcMKKdyahe?mode=videoAndDoc",
                                    "_blank" // opens in a new tab
                                )}
                                className="text-lg px-10 py-4 border-2 border-gray-300 hover:border-primary-400 hover:bg-primary-50 transition-all duration-300"
                            >
                                <Icons.Play className="mr-3" size={20} />
                                Watch Demo
                            </Button>

                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                                <div className="text-gray-600">Curated Activities</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">10k+</div>
                                <div className="text-gray-600">Happy Planners</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-pink-600 mb-2">4.9★</div>
                                <div className="text-gray-600">User Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Activity Categories */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Discover Activities You'll <span className="text-primary-600">Love</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            From relaxing spa days to thrilling outdoor adventures, find the perfect activities
                            for every mood and energy level
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activityCategories.map((category, index) => {
                            const IconComponent = Icons[category.icon];
                            return (
                                <div
                                    key={index}
                                    className="group cursor-pointer animate-on-scroll"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={handleGetStarted}
                                >
                                    <div className={`${category.bgColor} rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 border border-gray-100`}>
                                        <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500`}>
                                            <IconComponent size={32} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">{category.count}</p>
                                        <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                                            Explore <Icons.ArrowRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Enhanced Features Section */}
            <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Why Choose <span className="text-primary-600">Weekendly?</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful features designed to make weekend planning effortless, enjoyable, and incredibly effective
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const IconComponent = Icons[feature.icon];
                            return (
                                <div
                                    key={index}
                                    className="group animate-on-scroll"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border border-gray-100">
                                        <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent size={28} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Loved by <span className="text-primary-600">Thousands</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            See what our community says about their weekend planning experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 animate-on-scroll"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Icons.Star key={i} size={16} className="text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic leading-relaxed">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-gray-600 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="py-20 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Weekends?
                    </h2>
                    <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                        Join thousands of happy planners who've already discovered the joy of perfectly planned weekends
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            size="lg"
                            onClick={handleGetStarted}
                            className="text-lg px-10 py-4 bg-white text-primary-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            <Icons.Calendar className="mr-3" size={20} />
                            Start Planning Free
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleViewPlans}
                            className="text-lg px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-300"
                        >
                            <Icons.Gift className="mr-3" size={20} />
                            View Sample Plans
                        </Button>
                    </div>
                </div>
            </div>

            {/* Enhanced Footer */}
            <footer className="bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-purple-500 rounded-lg flex items-center justify-center">
                                    <Icons.Calendar className="text-white" size={20} />
                                </div>
                                <span className="text-white font-bold text-xl">Weekendly</span>
                            </div>
                            <p className="text-gray-400 max-w-md">
                                The ultimate weekend planning platform. Make every weekend count with intelligent
                                activity suggestions and seamless planning tools.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2025 Weekendly. Made by Vishal Tambi with ❤️ for weekend enthusiasts everywhere.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
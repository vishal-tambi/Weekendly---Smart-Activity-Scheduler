import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import Button from '../ui/Button';
const LandingPage = () => {
    const navigate = useNavigate();

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
            count: '8 activities'
        },
        {
            name: 'Adventure',
            icon: 'Mountain',
            count: '12 activities'
        },
        {
            name: 'Entertainment',
            icon: 'Film',
            count: '15 activities'
        },
        {
            name: 'Wellness',
            icon: 'Heart',
            count: '6 activities'
        },
        {
            name: 'Social',
            icon: 'Users',
            count: '10 activities'
        },
        {
            name: 'Creative',
            icon: 'Palette',
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
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-soft">
                                <Icons.Calendar className="text-white" size={22} />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Weekendly
                            </h1>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="ghost" onClick={handleViewPlans} className="hidden sm:flex">
                                <Icons.BookOpen className="mr-2" size={16} />
                                My Plans
                            </Button>
                            <Button onClick={handleGetStarted}>
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>



            {/* Hero Section with Enhanced Visuals */}
            <section className="relative pt-16 pb-24 overflow-hidden">
                <img
                    src="/hero-bg.jpg"
                    alt="People enjoying a weekend"
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50 opacity-80 -z-10">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.1),transparent_50%)]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pt-16">

                    <div className="text-center animate-on-scroll">

                        <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-semibold mb-8">
                            <Icons.Sparkles className="mr-2" size={16} />
                            AI-Powered Weekend Planning
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
                            <span className="text-gray-900">
                                Plan Your Perfect
                            </span>
                            <br />
                            <span className="text-primary-600">
                                Weekend
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed text-balance">
                            Transform your weekends into extraordinary experiences with our intelligent planning platform.
                            Choose from 50+ curated activities, get AI-powered suggestions, and create the perfect
                            Saturday-Sunday schedule that matches your mood and energy.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Button
                                size="lg"
                                onClick={handleGetStarted}
                            >
                                <Icons.Rocket className="mr-2" size={20} />
                                Start Planning Free
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => window.open(
                                    "https://embed.app.guidde.com/playbooks/hx1B6THsFL1iFxq9a28PZ7?mode=videoAndDoc",
                                    "_blank"
                                )}
                            >
                                <Icons.Play className="mr-2" size={20} />
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600 mb-1">50+</div>
                                <div className="text-gray-600 text-sm font-medium">Curated Activities</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600 mb-1">10k+</div>
                                <div className="text-gray-600 text-sm font-medium">Happy Planners</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600 mb-1">4.9★</div>
                                <div className="text-gray-600 text-sm font-medium">User Rating</div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Enhanced Activity Categories */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 animate-on-scroll">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Discover Activities You'll <span className="text-primary-600">Love</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
                            From relaxing spa days to thrilling outdoor adventures, find the perfect activities
                            for every mood and energy level
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center sm:justify-items-stretch">
                        {activityCategories.map((category, index) => {
                            const IconComponent = Icons[category.icon];
                            return (
                                <div
                                    key={index}
                                    className="group cursor-pointer animate-on-scroll w-full max-w-sm mx-auto sm:max-w-none sm:mx-0"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={handleGetStarted}
                                >
                                    <div className="bg-white rounded-2xl p-6 hover:shadow-large transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-100 h-full text-center sm:text-left">
                                        <div className={`w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0`}>
                                            <IconComponent size={24} className="text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">{category.count}</p>
                                        <div className="flex items-center justify-center sm:justify-start text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                                            Explore <Icons.ArrowRight size={14} className="ml-2" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Enhanced Features Section */}
            <section className="py-16 lg:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 animate-on-scroll">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose <span className="text-primary-600">Weekendly?</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
                            Powerful features designed to make weekend planning effortless, enjoyable, and incredibly effective
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center md:justify-items-stretch">
                        {features.map((feature, index) => {
                            const IconComponent = Icons[feature.icon];
                            return (
                                <div
                                    key={index}
                                    className="group animate-on-scroll w-full max-w-sm mx-auto md:max-w-none md:mx-0"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-100 h-full text-center md:text-left">
                                        <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto md:mx-0">
                                            <IconComponent size={24} className="text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 animate-on-scroll">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Loved by <span className="text-primary-600">Thousands</span>
                        </h2>
                        <p className="text-lg text-gray-600 text-balance">
                            See what our community says about their weekend planning experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center md:justify-items-stretch">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 animate-on-scroll w-full max-w-sm mx-auto md:max-w-none md:mx-0 h-full text-center md:text-left"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="flex items-center justify-center md:justify-start mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Icons.Star key={i} size={16} className="text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center justify-center md:justify-start">
                                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                                        <div className="text-gray-600 text-xs">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced CTA Section */}
            <section className="py-16 lg:py-20 bg-primary-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Ready to Transform Your Weekends?
                    </h2>
                    <p className="text-lg text-primary-100 mb-8 pb-10 max-w-2xl mx-auto text-balance">
                        Join thousands of happy planners who've already discovered the joy of perfectly planned weekends
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            onClick={handleGetStarted}
                            className="bg-primary-600 text-primary-600 hover:bg-gray-50"
                        >
                            <Icons.Calendar className="mr-2" size={20} />
                            Start Planning Free
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleViewPlans}
                            className="border-2 border-white text-white hover:bg-white hover:text-primary-600"
                        >
                            <Icons.Gift className="mr-2" size={20} />
                            View Sample Plans
                        </Button>
                    </div>
                </div>
            </section>

            {/* Enhanced Footer */}
            <footer className="bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                    <Icons.Calendar className="text-white" size={18} />
                                </div>
                                <span className="text-white font-semibold text-lg">Weekendly</span>
                            </div>
                            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                                The ultimate weekend planning platform. Make every weekend count with intelligent
                                activity suggestions and seamless planning tools.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Mobile App</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 Weekendly. Made by Vishal Tambi with ❤️ for weekend enthusiasts everywhere.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
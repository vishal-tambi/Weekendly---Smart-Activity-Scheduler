import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityList from '../activities/ActivityList';
import WeekendSchedule from '../schedule/WeekendSchedule';
import AIPlanningAssistant from '../ai/AIPlanningAssistant';
import Breadcrumbs from '../ui/Breadcrumbs';
import Button from '../ui/Button';
import { useWeekend } from '../../contexts/WeekendContext';
import * as Icons from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PlannerApp = () => {
    const navigate = useNavigate();
    const { savePlan, clearPlan, currentPlan, updatePlanField, filters, setFilters } = useWeekend();
    const themes = [
        { value: 'lazy', label: 'Lazy Weekend', icon: 'Coffee' },
        { value: 'adventurous', label: 'Adventurous', icon: 'Mountain' },
        { value: 'family', label: 'Family Time', icon: 'Users' }
    ];

    const handleSavePlan = async () => {
        await savePlan();
        navigate('/plans');
    };
    // Increase max-width for the main container
    // Change max-w-7xl to max-w-[1600px] for more horizontal space 
    return (
        <div className="min-h-screen bg-gray-50">
            <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} />
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                            >
                                <Icons.Calendar className="text-primary-600" size={28} />
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Weekendly</h1>
                            </button>
                        </div>

                        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                            {/* Plan Title Input */}
                            <input
                                type="text"
                                placeholder="Plan title..."
                                value={currentPlan.title}
                                onChange={(e) => updatePlanField('title', e.target.value)}
                                className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />

                            {/* Theme Selector */}
                            <select
                                value={currentPlan.theme}
                                onChange={(e) => updatePlanField('theme', e.target.value)}
                                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                {themes.map(theme => (
                                    <option key={theme.value} value={theme.value}>
                                        {theme.label}
                                    </option>
                                ))}
                            </select>

                            {/* Action Buttons - Hidden on mobile, shown in a separate row */}
                            <div className="hidden sm:flex items-center space-x-2">
                                <Button variant="outline" onClick={() => navigate('/plans')} className="text-sm">
                                    <Icons.BookOpen className="mr-1 sm:mr-2" size={14} />
                                    <span className="hidden sm:inline">My Plans</span>
                                </Button>

                                <Button onClick={handleSavePlan} className="text-sm">
                                    <Icons.Save className="mr-1 sm:mr-2" size={14} />
                                    <span className="hidden sm:inline">Save</span>
                                </Button>

                                <Button variant="outline" onClick={clearPlan} className="text-sm">
                                    <Icons.RotateCcw className="mr-1 sm:mr-2" size={14} />
                                    <span className="hidden sm:inline">Clear</span>
                                </Button>
                            </div>

                            {/* Mobile Action Buttons */}
                            <div className="flex sm:hidden space-x-2">
                                <Button variant="outline" onClick={() => navigate('/plans')} className="flex-1 text-sm">
                                    <Icons.BookOpen className="mr-1" size={14} />
                                    Plans
                                </Button>

                                <Button onClick={handleSavePlan} className="flex-1 text-sm">
                                    <Icons.Save className="mr-1" size={14} />
                                    Save
                                </Button>

                                <Button variant="outline" onClick={clearPlan} className="flex-1 text-sm">
                                    <Icons.RotateCcw className="mr-1" size={14} />
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Breadcrumbs />

            {/* Main Content */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 overflow-hidden">
                <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8 min-h-0">
                    {/* Activities Section */}
                    <div className="lg:col-span-4 min-w-0">
                        <div className="lg:sticky lg:top-8 overflow-hidden">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                                Available Activities
                            </h2>
                            <div className="mb-4 relative">
                                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search activities..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                                <ActivityList />
                            </div>
                        </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="lg:col-span-4 min-w-0 overflow-hidden">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 overflow-hidden">
                            <WeekendSchedule />
                        </div>
                    </div>
                    {/* AI Assistant Section - moved to the right */}
                    <div className="lg:col-span-4 min-w-0">
                        <div className="lg:sticky lg:top-8 overflow-hidden">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                                <Icons.Bot className="mr-2" size={20} />
                                AI Assistant
                            </h2>
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                                <AIPlanningAssistant />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlannerApp;
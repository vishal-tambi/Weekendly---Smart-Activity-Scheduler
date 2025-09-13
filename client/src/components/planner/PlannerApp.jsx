import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityList from '../activities/ActivityList';
import WeekendSchedule from '../schedule/WeekendSchedule';
import AIPlanningAssistant from '../ai/AIPlanningAssistant';
import Breadcrumbs from '../ui/Breadcrumbs';
import Button from '../ui/Button';
import { useWeekend } from '../../contexts/WeekendContext';
import * as Icons from 'lucide-react';

const PlannerApp = () => {
    const navigate = useNavigate();
    const { savePlan, clearPlan, currentPlan, updatePlanField } = useWeekend();

    const themes = [
        { value: 'lazy', label: 'Lazy Weekend', icon: 'Coffee' },
        { value: 'adventurous', label: 'Adventurous', icon: 'Mountain' },
        { value: 'family', label: 'Family Time', icon: 'Users' }
    ];

    const handleSavePlan = async () => {
        await savePlan();
        navigate('/plans');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                            >
                                <Icons.Calendar className="text-primary-600" size={32} />
                                <h1 className="text-2xl font-bold text-gray-900">Weekendly</h1>
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Plan title..."
                                value={currentPlan.title}
                                onChange={(e) => updatePlanField('title', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-48"
                            />

                            <select
                                value={currentPlan.theme}
                                onChange={(e) => updatePlanField('theme', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                {themes.map(theme => (
                                    <option key={theme.value} value={theme.value}>
                                        {theme.label}
                                    </option>
                                ))}
                            </select>

                            <Button variant="outline" onClick={() => navigate('/plans')}>
                                <Icons.BookOpen className="mr-2" size={16} />
                                My Plans
                            </Button>

                            <Button onClick={handleSavePlan}>
                                <Icons.Save className="mr-2" size={16} />
                                Save Plan
                            </Button>

                            <Button variant="outline" onClick={clearPlan}>
                                <Icons.RotateCcw className="mr-2" size={16} />
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <Breadcrumbs />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar - Activities */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-8 space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                    Available Activities
                                </h2>
                                <ActivityList />
                            </div>
                        </div>
                    </div>

                    {/* Middle - Schedule */}
                    <div className="lg:col-span-2">
                        <WeekendSchedule />
                    </div>

                    {/* Right Sidebar - AI Assistant */}
                    {/* Right Sidebar - AI Assistant */}
                    <div className="lg:col-span-1 lg:min-w-[80rem]"> {/* Set minimum width */}
                        <div className="sticky top-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                <Icons.Bot className="mr-2" size={24} />
                                AI Assistant
                            </h2>
                            <AIPlanningAssistant />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlannerApp;
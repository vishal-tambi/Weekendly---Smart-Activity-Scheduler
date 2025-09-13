import React, { useState, useEffect } from 'react';
import { useWeekend } from '../../contexts/WeekendContext';
import aiService from '../../services/aiService';
import Button from '../ui/Button';
import Card from '../ui/Card';
import * as Icons from 'lucide-react';

const AIPlanningAssistant = () => {
  const { activities, currentPlan, updatePlanField } = useWeekend();
  const [weatherData, setWeatherData] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [smartSuggestions, setSmartSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);

  // Load weather data on component mount
  useEffect(() => {
    loadWeatherData();
    generateSmartSuggestions();
  }, []);

  // Update suggestions when plan changes
  useEffect(() => {
    generateSmartSuggestions();
  }, [currentPlan, activities]);

  const loadWeatherData = async () => {
    try {
      const weather = await aiService.getWeatherData();
      setWeatherData(weather);
    } catch (error) {
      console.error('Failed to load weather:', error);
    }
  };

  const generateSmartSuggestions = () => {
    if (activities.length > 0) {
      const suggestions = aiService.getSmartSuggestions(currentPlan, activities);
      setSmartSuggestions(suggestions);
    }
  };

  const handleAutoComplete = () => {
    const autoCompleted = aiService.autoCompleteWeekend(
      currentPlan.theme, 
      activities, 
      weatherData
    );
    
    updatePlanField('saturday', autoCompleted.saturday);
    updatePlanField('sunday', autoCompleted.sunday);
  };

  const handleAIGeneration = async () => {
    if (!aiPrompt.trim()) {
      alert('Please enter a description for your ideal weekend!');
      return;
    }

    setLoading(true);
    try {
      const aiPlan = await aiService.generateWeekendWithAI(
        aiPrompt,
        activities,
        weatherData,
        currentPlan.theme
      );

      if (aiPlan) {
        updatePlanField('saturday', aiPlan.saturday);
        updatePlanField('sunday', aiPlan.sunday);
        setAiInsights(aiPlan.aiInsights);
        setAiPrompt(''); // Clear prompt after successful generation
      } else {
        alert('Failed to generate AI plan. Please try again with a different description.');
      }
    } catch (error) {
      console.error('AI generation failed:', error);
      alert('AI planning failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'clear': 'Sun',
      'clouds': 'Cloud',
      'rain': 'CloudRain',
      'drizzle': 'CloudDrizzle',
      'thunderstorm': 'Zap',
      'snow': 'CloudSnow',
      'mist': 'Cloud',
      'fog': 'Cloud'
    };
    
    return Icons[iconMap[condition.toLowerCase()]] || Icons.Cloud;
  };

  return (
    <div className="space-y-6">
      {/* Weather Display */}
      {weatherData && weatherData.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Icons.CloudSun className="mr-2" size={20} />
            Weekend Weather Forecast
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weatherData.map((day, index) => {
              const WeatherIcon = getWeatherIcon(day.condition);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <WeatherIcon size={24} className="text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{day.day}</p>
                      <p className="text-sm text-gray-600">{day.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{day.temp}°C</p>
                    <p className="text-xs text-gray-600">{day.humidity}% humidity</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* AI Planning Assistant */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Icons.Brain className="mr-2" size={20} />
          AI Planning Assistant
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your ideal weekend:
            </label>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="E.g., 'I want a relaxing weekend with some outdoor activities if the weather is nice, and maybe try some new food places...'"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 h-20 resize-none"
            />
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={handleAIGeneration}
              disabled={loading || !aiPrompt.trim()}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Icons.Loader className="mr-2 animate-spin" size={16} />
                  Generating...
                </>
              ) : (
                <>
                  <Icons.Sparkles className="mr-2" size={16} />
                  Generate AI Plan
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleAutoComplete}
            >
              <Icons.Wand2 className="mr-2" size={16} />
              Quick Complete
            </Button>
          </div>
        </div>

        {/* AI Insights */}
        {aiInsights && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center">
              <Icons.Lightbulb className="mr-2" size={16} />
              AI Insights
            </h4>
            <p className="text-sm text-blue-800 mb-2">{aiInsights.reasoning}</p>
            {aiInsights.weatherConsiderations && (
              <p className="text-sm text-blue-700">
                <span className="font-medium">Weather considerations:</span> {aiInsights.weatherConsiderations}
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Smart Suggestions */}
      {smartSuggestions.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Icons.Target className="mr-2" size={20} />
            Smart Suggestions
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              AI Powered
            </span>
          </h3>
          
          <div className="space-y-3">
            {smartSuggestions.map((activity, index) => (
              <div 
                key={activity._id} 
                className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-600">
                      {activity.category} • {activity.mood} • {activity.duration}h
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-white px-2 py-1 rounded text-gray-600">
                    AI Suggested
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      // Add to Saturday by default, user can move it later
                      const newActivity = {
                        activityId: activity._id,
                        activity: activity,
                        startTime: '10:00',
                        customNotes: 'AI Suggestion'
                      };
                      updatePlanField('saturday', [...currentPlan.saturday, newActivity]);
                    }}
                  >
                    <Icons.Plus size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIPlanningAssistant;
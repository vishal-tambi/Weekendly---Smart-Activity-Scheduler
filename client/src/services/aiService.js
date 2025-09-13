import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI with correct model
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY)
// Weather API key
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

class AIService {
  constructor() {
    // Use correct model name
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }


  // Get weather data
  async getWeatherData(city = "Mumbai") {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      
      // Get weekend weather (next Saturday and Sunday)
      const weekendWeather = this.extractWeekendWeather(data.list);
      return weekendWeather;
    } catch (error) {
      console.error('Weather API error:', error);
      return null;
    }
  }

  // Extract weekend weather from forecast
  extractWeekendWeather(forecastList) {
    const now = new Date();
    const weekend = [];
    
    for (const forecast of forecastList) {
      const date = new Date(forecast.dt * 1000);
      const dayOfWeek = date.getDay();
      
      // 6 = Saturday, 0 = Sunday
      if ((dayOfWeek === 6 || dayOfWeek === 0) && date > now) {
        weekend.push({
          day: dayOfWeek === 6 ? 'Saturday' : 'Sunday',
          date: date.toLocaleDateString(),
          temp: Math.round(forecast.main.temp),
          condition: forecast.weather[0].main,
          description: forecast.weather[0].description,
          humidity: forecast.main.humidity,
          windSpeed: forecast.wind.speed
        });
        
        if (weekend.length === 2) break; // Got both Saturday and Sunday
      }
    }
    
    return weekend;
  }

  // Smart activity suggestions based on current plan
  getSmartSuggestions(currentPlan, allActivities) {
    const suggestions = [];
    const plannedActivities = [...currentPlan.saturday, ...currentPlan.sunday];
    const plannedActivityIds = plannedActivities.map(item => item.activityId || item.activity?._id);
    
    // Get unplanned activities
    const unplannedActivities = allActivities.filter(
      activity => !plannedActivityIds.includes(activity._id)
    );

    // Analyze current plan mood balance
    const currentMoods = plannedActivities.map(item => item.activity?.mood).filter(Boolean);
    const moodCounts = currentMoods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});

    // Suggest balancing activities
    if (moodCounts.energetic > moodCounts.relaxed) {
      suggestions.push(...unplannedActivities.filter(a => a.mood === 'relaxed').slice(0, 2));
    } else if (moodCounts.relaxed > moodCounts.energetic) {
      suggestions.push(...unplannedActivities.filter(a => a.mood === 'energetic').slice(0, 2));
    } else {
      suggestions.push(...unplannedActivities.filter(a => a.mood === 'happy').slice(0, 2));
    }

    // Add variety by category
    const plannedCategories = plannedActivities.map(item => item.activity?.category).filter(Boolean);
    const missingCategories = ['food', 'outdoor', 'entertainment', 'wellness', 'social', 'creative']
      .filter(cat => !plannedCategories.includes(cat));
    
    missingCategories.forEach(category => {
      const categoryActivity = unplannedActivities.find(a => a.category === category);
      if (categoryActivity && !suggestions.find(s => s._id === categoryActivity._id)) {
        suggestions.push(categoryActivity);
      }
    });

    return suggestions.slice(0, 4); // Return top 4 suggestions
  }

  // Auto-complete weekend based on theme
  autoCompleteWeekend(theme, allActivities, weatherData = null) {
    const themeActivities = {
      lazy: ['reading', 'spa', 'movie', 'brunch', 'meditation', 'yoga'],
      adventurous: ['hiking', 'bike', 'photography', 'beach', 'outdoor', 'explore'],
      family: ['board', 'family', 'park', 'cook', 'game', 'picnic']
    };

    const keywords = themeActivities[theme] || [];
    
    // Filter activities by theme keywords
    let filteredActivities = allActivities.filter(activity =>
      keywords.some(keyword => 
        activity.name.toLowerCase().includes(keyword) ||
        activity.description.toLowerCase().includes(keyword) ||
        activity.category.toLowerCase().includes(keyword)
      )
    );

    // Weather-aware filtering
    if (weatherData) {
      filteredActivities = this.applyWeatherFiltering(filteredActivities, weatherData);
    }

    // Create balanced weekend
    const saturday = [];
    const sunday = [];

    // Distribute activities ensuring mood balance
    const moods = ['energetic', 'happy', 'relaxed'];
    let currentDay = 'saturday';

    moods.forEach(mood => {
      const moodActivities = filteredActivities.filter(a => a.mood === mood);
      if (moodActivities.length > 0) {
        const activity = moodActivities[Math.floor(Math.random() * moodActivities.length)];
        
        if (currentDay === 'saturday' && saturday.length < 3) {
          saturday.push({
            activityId: activity._id,
            activity: activity,
            startTime: this.generateStartTime(saturday.length),
            customNotes: ''
          });
        } else if (sunday.length < 3) {
          sunday.push({
            activityId: activity._id,
            activity: activity,
            startTime: this.generateStartTime(sunday.length),
            customNotes: ''
          });
        }
        
        // Remove used activity
        filteredActivities = filteredActivities.filter(a => a._id !== activity._id);
        currentDay = currentDay === 'saturday' ? 'sunday' : 'saturday';
      }
    });

    return { saturday, sunday };
  }

  // Apply weather filtering to activities
  applyWeatherFiltering(activities, weatherData) {
    if (!weatherData || weatherData.length === 0) return activities;

    const weekendConditions = weatherData.map(day => day.condition.toLowerCase());
    const hasRain = weekendConditions.some(condition => 
      condition.includes('rain') || condition.includes('drizzle')
    );
    const isCold = weatherData.some(day => day.temp < 15);
    const isHot = weatherData.some(day => day.temp > 30);

    let filtered = [...activities];

    // Filter based on weather conditions
    if (hasRain) {
      // Prefer indoor activities when raining
      filtered = filtered.map(activity => ({
        ...activity,
        weatherScore: activity.isIndoor ? 1 : 0.3
      }));
    } else {
      // Good weather - boost outdoor activities
      filtered = filtered.map(activity => ({
        ...activity,
        weatherScore: activity.isIndoor ? 0.7 : 1
      }));
    }

    if (isCold) {
      // Reduce outdoor activities in cold weather
      filtered = filtered.map(activity => ({
        ...activity,
        weatherScore: activity.isIndoor ? activity.weatherScore : activity.weatherScore * 0.5
      }));
    }

    if (isHot) {
      // Prefer morning/evening activities, indoor during hot weather
      filtered = filtered.map(activity => ({
        ...activity,
        weatherScore: activity.category === 'wellness' || activity.isIndoor 
          ? activity.weatherScore : activity.weatherScore * 0.8
      }));
    }

    // Sort by weather score and return top activities
    return filtered
      .sort((a, b) => (b.weatherScore || 0.5) - (a.weatherScore || 0.5))
      .map(activity => {
        const { _weatherScore, ...activityWithoutScore } = activity;
        return activityWithoutScore;
      });
  }

  // Generate appropriate start times
  generateStartTime(activityIndex) {
    const startTimes = ['09:00', '12:00', '15:00', '18:00'];
    return startTimes[activityIndex] || '10:00';
  }

  // AI-powered weekend planning with natural language
  async generateWeekendWithAI(prompt, currentActivities, weatherData = null, theme = 'lazy') {
    try {
      // Create context for AI
      const activitiesContext = currentActivities.map(a => 
        `${a.name} (${a.category}, ${a.mood}, ${a.duration}h) - ${a.description}`
      ).join('\n');

      const weatherContext = weatherData ? 
        weatherData.map(day => 
          `${day.day}: ${day.temp}°C, ${day.description}`
        ).join('\n') : 
        'Weather data not available';

      const aiPrompt = `
You are a weekend planning assistant. Help create the perfect weekend plan based on the user's request.

Available Activities:
${activitiesContext}

Weather Forecast:
${weatherContext}

Current Theme: ${theme}

User Request: "${prompt}"

Please suggest 2-3 activities for Saturday and 2-3 activities for Sunday. Consider:
1. Weather conditions (indoor vs outdoor activities)
2. Activity balance (mix of energetic, happy, and relaxed moods)
3. Time flow (logical sequence throughout the day)
4. User's specific preferences mentioned in their request

Respond in JSON format:
{
  "saturday": [
    {
      "activityName": "Activity Name",
      "startTime": "HH:MM",
      "reasoning": "Why this activity fits"
    }
  ],
  "sunday": [
    {
      "activityName": "Activity Name", 
      "startTime": "HH:MM",
      "reasoning": "Why this activity fits"
    }
  ],
  "overallReasoning": "Brief explanation of the weekend plan",
  "weatherConsiderations": "How weather influenced the suggestions"
}
`;

      const result = await this.model.generateContent(aiPrompt);
      const response = await result.response;
      const text = response.text();

      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const aiSuggestion = JSON.parse(jsonMatch[0]);
        return this.convertAISuggestionToPlan(aiSuggestion, currentActivities);
      }

      return null;
    } catch (error) {
      console.error('AI Generation error:', error);
      return null;
    }
  }

  // Convert AI suggestion to plan format
  convertAISuggestionToPlan(aiSuggestion, allActivities) {
    const convertDay = (daySuggestions) => {
      return daySuggestions.map(suggestion => {
        // Find matching activity
        const activity = allActivities.find(a => 
          a.name.toLowerCase().includes(suggestion.activityName.toLowerCase()) ||
          suggestion.activityName.toLowerCase().includes(a.name.toLowerCase())
        );

        if (activity) {
          return {
            activityId: activity._id,
            activity: activity,
            startTime: suggestion.startTime,
            customNotes: suggestion.reasoning || ''
          };
        }
        return null;
      }).filter(Boolean);
    };

    return {
      saturday: convertDay(aiSuggestion.saturday || []),
      sunday: convertDay(aiSuggestion.sunday || []),
      aiInsights: {
        reasoning: aiSuggestion.overallReasoning,
        weatherConsiderations: aiSuggestion.weatherConsiderations
      }
    };
  }
}

export default new AIService();


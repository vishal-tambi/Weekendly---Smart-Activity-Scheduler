import React from 'react';
import * as Icons from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ActivityCard = ({ activity, onAdd, showAddButton = true }) => {
  const IconComponent = Icons[activity.icon] || Icons.Calendar;
  
  const moodColors = {
    happy: 'bg-yellow-100 text-yellow-800',
    relaxed: 'bg-blue-100 text-blue-800',
    energetic: 'bg-green-100 text-green-800'
  };

  const categoryColors = {
    food: 'bg-orange-50 border-orange-200',
    outdoor: 'bg-green-50 border-green-200',
    entertainment: 'bg-purple-50 border-purple-200',
    wellness: 'bg-blue-50 border-blue-200',
    social: 'bg-pink-50 border-pink-200',
    creative: 'bg-indigo-50 border-indigo-200'
  };

  return (
    <Card className={`p-8 hover:shadow-lg transition-shadow ${categoryColors[activity.category] || ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <IconComponent size={24} className="text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{activity.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${moodColors[activity.mood]}`}>
                {activity.mood}
              </span>
              <span className="text-xs text-gray-500">
                {activity.duration}h
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {activity.category}
              </span>
            </div>
          </div>
        </div>
        {showAddButton && (
          <Button 
            size="sm" 
            onClick={() => onAdd(activity)}
            className="ml-2"
          >
            Add
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ActivityCard;
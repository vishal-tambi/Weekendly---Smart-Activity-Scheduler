import React, { useState } from 'react';
import { useWeekend } from '../../contexts/WeekendContext';
import ActivityCard from './ActivityCard';
import ActivityFilters from './ActivityFilters';
import Button from '../ui/Button';
import * as Icons from 'lucide-react';

const ActivityList = () => {
  const { activities, loading, addActivityToDay } = useWeekend();
  const [selectedDay, setSelectedDay] = useState('saturday');

  const handleAddActivity = (activity) => {
    addActivityToDay(selectedDay, activity);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-24"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Day Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add activities to:
        </label>
        <div className="flex space-x-2">
          <Button
            variant={selectedDay === 'saturday' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedDay('saturday')}
          >
            <Icons.Calendar className="mr-1" size={14} />
            Saturday
          </Button>
          <Button
            variant={selectedDay === 'sunday' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedDay('sunday')}
          >
            <Icons.Calendar className="mr-1" size={14} />
            Sunday
          </Button>
        </div>
      </div>

      <ActivityFilters />
      
      <div className="space-y-4">
        {activities.map(activity => (
          <ActivityCard
            key={activity._id}
            activity={activity}
            onAdd={handleAddActivity}
          />
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Icons.Search size={48} className="mx-auto mb-2 text-gray-300" />
          <p>No activities found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default ActivityList;
import React from 'react';
import ScheduleDay from './ScheduleDay';
import { useWeekend } from '../../contexts/WeekendContext';

const WeekendSchedule = () => {
  const { currentPlan } = useWeekend();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {currentPlan.title}
        </h2>
        <p className="text-gray-600 capitalize">
          {currentPlan.theme} weekend theme
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScheduleDay day="saturday" dayName="Saturday" />
        <ScheduleDay day="sunday" dayName="Sunday" />
      </div>
    </div>
  );
};

export default WeekendSchedule;
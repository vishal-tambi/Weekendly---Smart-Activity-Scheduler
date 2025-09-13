import React from 'react';
import * as Icons from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useWeekend } from '../../contexts/WeekendContext';

const ScheduleDay = ({ day, dayName }) => {
  const { currentPlan, removeActivityFromDay, updateActivityTime } = useWeekend();
  const activities = currentPlan[day] || [];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Icons.Calendar className="mr-2" size={20} />
        {dayName}
      </h3>
      
      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Icons.PlusCircle size={48} className="mx-auto mb-2 text-gray-300" />
          <p>No activities planned</p>
          <p className="text-sm">Add activities from the sidebar</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((item, index) => {
            const IconComponent = Icons[item.activity?.icon] || Icons.Calendar;
            return (
              <div key={index} className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <IconComponent size={20} className="text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {item.activity?.name || 'Unknown Activity'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item.activity?.duration}h • {item.activity?.mood}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={item.startTime}
                    onChange={(e) => updateActivityTime(day, index, e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeActivityFromDay(day, index)}
                  >
                    <Icons.Trash2 size={16} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default ScheduleDay;
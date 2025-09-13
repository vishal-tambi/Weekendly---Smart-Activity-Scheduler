import React from 'react';
import { useWeekend } from '../../contexts/WeekendContext';

const ActivityFilters = () => {
  const { filters, setFilters } = useWeekend();

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'social', label: 'Social' },
    { value: 'creative', label: 'Creative' }
  ];

  const moods = [
    { value: '', label: 'All Moods' },
    { value: 'happy', label: 'Happy' },
    { value: 'relaxed', label: 'Relaxed' },
    { value: 'energetic', label: 'Energetic' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="font-semibold text-gray-900 mb-3">Filter Activities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mood
          </label>
          <select
            value={filters.mood}
            onChange={(e) => setFilters({ mood: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {moods.map(mood => (
              <option key={mood.value} value={mood.value}>
                {mood.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ActivityFilters;
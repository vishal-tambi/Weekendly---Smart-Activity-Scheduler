import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { plansAPI } from '../../services/api';
import ActivityCard from '../activities/ActivityCard';
import Card from '../ui/Card';
import Button from '../ui/Button';
import * as Icons from 'lucide-react';

const ShareablePlan = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPlan();
  }, [id]);

  const loadPlan = async () => {
    try {
      setLoading(true);
      const response = await plansAPI.getById(id);
      setPlan(response.data);
    } catch (error) {
        console.log(error)
      setError('Plan not found or no longer available');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icons.Loader className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading shared plan...</p>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Icons.AlertCircle className="mx-auto mb-4 text-red-500" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan Not Available</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.href = '/'}>
            <Icons.Home className="mr-2" size={16} />
            Go to Weekendly
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Icons.Calendar className="text-primary-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">Weekendly</h1>
            </div>
            <div className="bg-gradient-to-r from-primary-100 to-blue-100 px-4 py-2 rounded-full inline-block">
              <p className="text-primary-800 font-medium">Shared Weekend Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shareable Plan Content */}
      <div id="shareable-plan" className="max-w-4xl mx-auto px-4 py-8">
        {/* Plan Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{plan.title}</h2>
          <div className="flex items-center justify-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Icons.Tag className="text-primary-600" size={20} />
              <span className="capitalize font-medium">{plan.theme} Weekend</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icons.Calendar className="text-primary-600" size={20} />
              <span>{new Date(plan.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            {plan.isLongWeekend && (
              <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                Long Weekend
              </div>
            )}
          </div>
        </div>

        {/* Weekend Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Saturday */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Icons.Sun className="mr-3 text-yellow-500" size={28} />
              Saturday
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {plan.saturday?.length || 0} activities
              </span>
            </h3>
            
            {plan.saturday?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Icons.Calendar size={48} className="mx-auto mb-2 text-gray-300" />
                <p>No activities planned</p>
              </div>
            ) : (
              <div className="space-y-4">
                {plan.saturday?.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-primary-600 bg-primary-100 px-3 py-1 rounded-full">
                        {item.startTime}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.activityId?.duration}h duration
                      </span>
                    </div>
                    {item.activityId && (
                      <ActivityCard 
                        activity={item.activityId} 
                        showAddButton={false}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Sunday */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Icons.Moon className="mr-3 text-purple-500" size={28} />
              Sunday
              <span className="ml-2 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                {plan.sunday?.length || 0} activities
              </span>
            </h3>
            
            {plan.sunday?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Icons.Calendar size={48} className="mx-auto mb-2 text-gray-300" />
                <p>No activities planned</p>
              </div>
            ) : (
              <div className="space-y-4">
                {plan.sunday?.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                        {item.startTime}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.activityId?.duration}h duration
                      </span>
                    </div>
                    {item.activityId && (
                      <ActivityCard 
                        activity={item.activityId} 
                        showAddButton={false}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Icons.Calendar className="text-primary-600" size={24} />
            <span className="text-lg font-semibold text-gray-900">Created with Weekendly</span>
          </div>
          <p className="text-gray-600 mb-6">Make every weekend count</p>
          <Button onClick={() => window.location.href = '/'} size="lg">
            Create Your Own Weekend Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareablePlan;
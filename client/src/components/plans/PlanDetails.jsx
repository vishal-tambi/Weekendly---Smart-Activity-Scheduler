import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { plansAPI } from '../../services/api';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ActivityCard from '../activities/ActivityCard';
import ExportModal from '../share/ExportModal';
import * as Icons from 'lucide-react';

const PlanDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    loadPlan();
  }, [id]);

  const loadPlan = async () => {
    try {
      setLoading(true);
      const response = await plansAPI.getById(id);
      setPlan(response.data);
    } catch (error) {
      setError('Failed to load plan');
      console.error('Error loading plan:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icons.Loader className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading plan details...</p>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icons.AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Plan Not Found</h3>
          <p className="text-gray-600 mb-4">{error || 'This plan could not be found.'}</p>
          <Button onClick={() => navigate('/plans')}>
            Back to Plans
          </Button>
        </div>
      </div>
    );
  }

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
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => navigate('/plans')}>
                <Icons.ArrowLeft className="mr-2" size={16} />
                Back to Plans
              </Button>
              
              <Button onClick={() => setShowExportModal(true)}>
                <Icons.Share2 className="mr-2" size={16} />
                Share & Export
              </Button>
              
              <Button onClick={() => navigate('/planner')}>
                <Icons.Plus className="mr-2" size={16} />
                Create New
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with exportable ID */}
      <div id="shareable-plan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plan Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {plan.title}
          </h2>
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <span className="capitalize">{plan.theme} weekend theme</span>
            <span>•</span>
            <span>{new Date(plan.createdAt).toLocaleDateString()}</span>
            {plan.isLongWeekend && (
              <>
                <span>•</span>
                <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm">
                  Long Weekend
                </span>
              </>
            )}
          </div>
        </div>

        {/* Weekend Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Saturday */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Icons.Calendar className="mr-2" size={20} />
              Saturday
            </h3>
            
            {plan.saturday?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Icons.Calendar size={48} className="mx-auto mb-2 text-gray-300" />
                <p>No activities planned for Saturday</p>
              </div>
            ) : (
              <div className="space-y-4">
                {plan.saturday?.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {item.activityId?.name || 'Activity'}
                      </h4>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {item.startTime}
                      </span>
                    </div>
                    {item.activityId && (
                      <ActivityCard 
                        activity={item.activityId} 
                        showAddButton={false}
                      />
                    )}
                    {item.customNotes && (
                      <p className="text-sm text-gray-600 mt-2">
                        Notes: {item.customNotes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Sunday */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Icons.Calendar className="mr-2" size={20} />
              Sunday
            </h3>
            
            {plan.sunday?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Icons.Calendar size={48} className="mx-auto mb-2 text-gray-300" />
                <p>No activities planned for Sunday</p>
              </div>
            ) : (
              <div className="space-y-4">
                {plan.sunday?.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {item.activityId?.name || 'Activity'}
                      </h4>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {item.startTime}
                      </span>
                    </div>
                    {item.activityId && (
                      <ActivityCard 
                        activity={item.activityId} 
                        showAddButton={false}
                      />
                    )}
                    {item.customNotes && (
                      <p className="text-sm text-gray-600 mt-2">
                        Notes: {item.customNotes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        planData={plan}
      />
    </div>
  );
};

export default PlanDetails;
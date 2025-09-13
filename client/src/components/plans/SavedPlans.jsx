import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeekend } from '../../contexts/WeekendContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ExportModal from '../share/ExportModal';
import exportService from '../../services/exportService';
import * as Icons from 'lucide-react';

const SavedPlans = () => {
  const navigate = useNavigate();
  const { savedPlans, loadSavedPlans, loading } = useWeekend();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    loadSavedPlans();
  }, []);

  const handleViewPlan = (planId) => {
    navigate(`/plans/${planId}`);
  };

  const handleCreateNew = () => {
    navigate('/planner');
  };

  const handleSharePlan = (plan, event) => {
    event.stopPropagation(); // Prevent card click
    setSelectedPlan(plan);
    setShowExportModal(true);
  };

  const handleQuickShare = async (plan, event) => {
    event.stopPropagation();
    const shareUrl = exportService.generateShareableLink(plan._id);
    const success = await exportService.copyToClipboard(shareUrl);
    if (success) {
      alert('Share link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icons.Loader className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading your plans...</p>
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
            
            <div className="flex items-center space-x-4">
              <Button onClick={handleCreateNew}>
                <Icons.Plus className="mr-2" size={16} />
                Create New Plan
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Weekend Plans</h2>
          <p className="text-gray-600">View, share, and manage all your saved weekend plans</p>
        </div>

        {savedPlans.length === 0 ? (
          <div className="text-center py-16">
            <Icons.Calendar size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No plans yet</h3>
            <p className="text-gray-600 mb-6">Start planning your perfect weekend!</p>
            <Button onClick={handleCreateNew}>
              <Icons.Plus className="mr-2" size={16} />
              Create Your First Plan
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPlans.map(plan => (
              <Card key={plan._id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {plan.theme} weekend
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </p>
                    {plan.isLongWeekend && (
                      <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full mt-1">
                        Long Weekend
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Icons.Calendar className="mr-2" size={16} />
                    Saturday: {plan.saturday?.length || 0} activities
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Icons.Calendar className="mr-2" size={16} />
                    Sunday: {plan.sunday?.length || 0} activities
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewPlan(plan._id)}
                  >
                    <Icons.Eye className="mr-1" size={14} />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={(e) => handleQuickShare(plan, e)}
                    className="px-3"
                  >
                    <Icons.Copy size={14} />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={(e) => handleSharePlan(plan, e)}
                    className="px-3"
                  >
                    <Icons.Share2 size={14} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        planData={selectedPlan}
      />
    </div>
  );
};

export default SavedPlans;
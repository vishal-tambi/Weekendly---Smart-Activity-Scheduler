import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import Button from './Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <Icons.Calendar className="mx-auto mb-4 text-primary-600" size={64} />
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist. Let's get you back to planning your perfect weekend!
        </p>
        <div className="space-x-4">
          <Button onClick={() => navigate('/')}>
            <Icons.Home className="mr-2" size={16} />
            Go Home
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/planner')}
          >
            <Icons.Calendar className="mr-2" size={16} />
            Start Planning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
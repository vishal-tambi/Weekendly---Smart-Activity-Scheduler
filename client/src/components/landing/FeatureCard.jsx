import React from 'react';
import * as Icons from 'lucide-react';

const FeatureCard = ({ icon, title, description, gradient = false }) => {
  const IconComponent = Icons[icon];
  
  return (
    <div className={`p-6 rounded-xl ${gradient ? 'bg-gradient-to-br from-white to-gray-50' : 'bg-white'} shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}>
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
        <IconComponent size={24} className="text-primary-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
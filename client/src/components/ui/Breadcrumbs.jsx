import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    
    if (path === '/') return [];
    if (path === '/planner') return [{ label: 'Weekend Planner', path: '/planner' }];
    if (path === '/plans') return [{ label: 'My Plans', path: '/plans' }];
    if (path.startsWith('/plans/')) return [
      { label: 'My Plans', path: '/plans' },
      { label: 'Plan Details', path: location.pathname }
    ];
    
    return [];
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Home
          </button>
          
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <Icons.ChevronRight size={16} className="text-gray-400" />
              <button
                onClick={() => navigate(crumb.path)}
                className={`transition-colors ${
                  index === breadcrumbs.length - 1
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {crumb.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
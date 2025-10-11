import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeekendProvider } from '../contexts/WeekendContext';
import LandingPage from '../components/landing/landingPage';
import PlannerApp from '../components/planner/PlannerApp';
import SavedPlans from '../components/plans/SavedPlans';
import PlanDetails from '../components/plans/PlanDetails';
import ShareablePlan from '../components/share/ShareablePlan';
import NotFound from '../components/ui/NotFound';

const AppRouter = () => {
  return (
    <Router>  
      <WeekendProvider>  
        <Routes> 
          <Route path="/" element={<LandingPage />} />
          <Route path="/planner" element={<PlannerApp />} />
          <Route path="/plans" element={<SavedPlans />} />
          <Route path="/plans/:id" element={<PlanDetails />} />
          <Route path="/shared/:id" element={<ShareablePlan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </WeekendProvider>
    </Router>
  );
};

export default AppRouter;
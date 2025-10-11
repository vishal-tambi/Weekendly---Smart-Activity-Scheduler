import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { activitiesAPI, plansAPI } from '../services/api';
import { toast } from 'react-toastify';

const WeekendContext = createContext();  //it's an container that will hiold all teh weekend planning data 

// Helper to convert HH:mm string to minutes from midnight
const timeToMinutes = (timeStr) => {
  if (!timeStr || !timeStr.includes(':')) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

//these are the starting pooints when you open the app
const initialState = {
  activities: [],
  currentPlan: {
    title: 'My Weekend Plan' ,
    theme: 'lazy',
    saturday: [],
    sunday: [],
    isLongWeekend: false
  },
  savedPlans: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    mood: '',
    search: ''
  }
};

//this is reducer that is like a command center that handles all the state changes :
function weekendReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':  //this helps to show and hide the loading spinner
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR': //display eror message
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_ACTIVITIES': //fils the activities list form server
      return { ...state, activities: action.payload, loading: false };
    
    case 'SET_CURRENT_PLAN': //replace the entire pan 
      return { ...state, currentPlan: action.payload };
    
    case 'UPDATE_PLAN_FIELD':// changes in one files liek ttitle or theme 
      return {
        ...state,
        
        currentPlan: { ...state.currentPlan, [action.field]: action.value }
      };
    
    case 'ADD_ACTIVITY_TO_DAY':  
      const { day, activity, time } = action.payload;
      return {
        ...state,
        currentPlan: {
          ...state.currentPlan,
          [day]: [...state.currentPlan[day], {
            activityId: activity._id,
            activity: activity,
            startTime: time || '09:00',
            customNotes: ''
          }]
        }
      };
    
    case 'REMOVE_ACTIVITY_FROM_DAY':
      return {
        ...state,
        currentPlan: {
          ...state.currentPlan,
          [action.day]: state.currentPlan[action.day].filter((_, index) => index !== action.index)
        }
      };
    
    case 'UPDATE_ACTIVITY_TIME':
      const updatedDay = [...state.currentPlan[action.day]];
      updatedDay[action.index].startTime = action.time;
      return {
        ...state,
        currentPlan: {
          ...state.currentPlan,
          [action.day]: updatedDay
        }
      };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
      
    case 'SET_SAVED_PLANS':
      return { ...state, savedPlans: action.payload };
    
    case 'CLEAR_CURRENT_PLAN':
      return { ...state, currentPlan: initialState.currentPlan };
    
    default:
      return state;
  }
}

export function WeekendProvider({ children }) {
  const [state, dispatch] = useReducer(weekendReducer, initialState);

  // Load activities on mount
  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async (filters = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const currentFilters = filters || state.filters;
      const response = await activitiesAPI.getAll(currentFilters);
      let activities = response.data;
      if (currentFilters.search) {
        const searchTerm = currentFilters.search.toLowerCase();
        activities = activities.filter(activity =>
          activity.name.toLowerCase().includes(searchTerm) ||
          (activity.category && activity.category.toLowerCase().includes(searchTerm))
        );
      }
      dispatch({ type: 'SET_ACTIVITIES', payload: activities });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load activities' });
    }
  };

  const savePlan = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await plansAPI.create(state.currentPlan);
      dispatch({ type: 'SET_CURRENT_PLAN', payload: response.data });
      loadSavedPlans();
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      console.log(error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save plan' });
    }
  };

  const loadSavedPlans = async () => {
    try {
      const response = await plansAPI.getAll();
      dispatch({ type: 'SET_SAVED_PLANS', payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load saved plans' });
    }
  };

  const addActivityToDay = (day, activity, time) => {
    const newActivityStartTime = timeToMinutes(time || '09:00');
    const newActivityDuration = (activity.duration || 1) * 60; // duration in minutes
    const newActivityEndTime = newActivityStartTime + newActivityDuration;

    for (const existing of state.currentPlan[day]) {
      const existingStartTime = timeToMinutes(existing.startTime);
      const existingDuration = (existing.activity.duration || 1) * 60;
      const existingEndTime = existingStartTime + existingDuration;

      // Check for overlap
      if (newActivityStartTime < existingEndTime && newActivityEndTime > existingStartTime) {
        const endTimeString = new Date(0, 0, 0, Math.floor(existingEndTime / 60), existingEndTime % 60)
          .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        toast.warn(`This conflicts with "${existing.activity.name}" which ends at ${endTimeString}. Please schedule for a later time.`);
        return; // Stop execution to prevent adding the activity
      }
    }

    dispatch({ type: 'ADD_ACTIVITY_TO_DAY', payload: { day, activity, time } });
  };

  const removeActivityFromDay = (day, index) => {
    dispatch({ type: 'REMOVE_ACTIVITY_FROM_DAY', day, index });
  };

  const updateActivityTime = (day, index, time) => {
    dispatch({ type: 'UPDATE_ACTIVITY_TIME', day, index, time });
  };

  const updatePlanField = (field, value) => {
    dispatch({ type: 'UPDATE_PLAN_FIELD', field, value });
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    loadActivities(filters);
  };

  const clearPlan = () => {
    dispatch({ type: 'CLEAR_CURRENT_PLAN' });
  };

  const value = {
    ...state,
    loadActivities,
    savePlan,
    loadSavedPlans,
    addActivityToDay,
    removeActivityFromDay,
    updateActivityTime,
    updatePlanField,
    setFilters,
    clearPlan
  };

  return (
    <WeekendContext.Provider value={value}>
      {children}
    </WeekendContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWeekend() {
  const context = useContext(WeekendContext);
  if (!context) {
    throw new Error('useWeekend must be used within a WeekendProvider');
  }
  return context;
}
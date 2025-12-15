import { projectId, publicAnonKey } from './supabase/info';
import { PredictionRecord, UserProfile } from '../App';

const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-201dba08`;

// Generate a simple user ID (in a real app, this would come from authentication)
export const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', userId);
  }
  return userId;
};

// Fetch all predictions
export const fetchPredictions = async (): Promise<PredictionRecord[]> => {
  const userId = getUserId();
  const response = await fetch(`${baseUrl}/predictions/${userId}`, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch predictions');
  }
  
  const data = await response.json();
  return data.predictions || [];
};

// Save a prediction
export const savePrediction = async (prediction: PredictionRecord): Promise<void> => {
  const userId = getUserId();
  const response = await fetch(`${baseUrl}/predictions/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify(prediction),
  });
  
  if (!response.ok) {
    throw new Error('Failed to save prediction');
  }
};

// Delete all predictions
export const clearAllPredictions = async (): Promise<void> => {
  const userId = getUserId();
  const response = await fetch(`${baseUrl}/predictions/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to clear predictions');
  }
};

// Fetch user profile
export const fetchProfile = async (): Promise<UserProfile | null> => {
  const userId = getUserId();
  const response = await fetch(`${baseUrl}/profile/${userId}`, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  
  const data = await response.json();
  return data.profile;
};

// Update user profile
export const updateProfile = async (profile: UserProfile): Promise<void> => {
  const userId = getUserId();
  const response = await fetch(`${baseUrl}/profile/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify(profile),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
};

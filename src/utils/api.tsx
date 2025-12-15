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
  console.log('Fetching predictions for user:', userId);
  
  const response = await fetch(`${baseUrl}/predictions/${userId}`, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });
  
  if (!response.ok) {
    console.error('Failed to fetch predictions:', response.statusText);
    throw new Error('Failed to fetch predictions');
  }
  
  const data = await response.json();
  console.log('Fetched predictions from Supabase:', data.predictions);
  return data.predictions || [];
};

// Save a prediction
export const savePrediction = async (prediction: PredictionRecord): Promise<void> => {
  const userId = getUserId();
  console.log('Saving prediction to Supabase for user:', userId, prediction);
  
  const response = await fetch(`${baseUrl}/predictions/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify(prediction),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to save prediction:', response.statusText, errorText);
    throw new Error('Failed to save prediction');
  }
  
  console.log('Successfully saved prediction to Supabase');
};

// Delete all predictions
export const clearAllPredictions = async (): Promise<void> => {
  const userId = getUserId();
  console.log('Clearing all predictions for user:', userId);
  
  const response = await fetch(`${baseUrl}/predictions/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });
  
  if (!response.ok) {
    console.error('Failed to clear predictions:', response.statusText);
    throw new Error('Failed to clear predictions');
  }
  
  console.log('Successfully cleared all predictions from Supabase');
};

// Fetch user profile
export const fetchProfile = async (): Promise<UserProfile | null> => {
  const userId = getUserId();
  console.log('Fetching profile for user:', userId);
  
  const response = await fetch(`${baseUrl}/profile/${userId}`, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });
  
  if (!response.ok) {
    console.error('Failed to fetch profile:', response.statusText);
    throw new Error('Failed to fetch profile');
  }
  
  const data = await response.json();
  console.log('Fetched profile from Supabase:', data.profile);
  return data.profile;
};

// Update user profile
export const updateProfile = async (profile: UserProfile): Promise<void> => {
  const userId = getUserId();
  console.log('Updating profile in Supabase for user:', userId, profile);
  
  const response = await fetch(`${baseUrl}/profile/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify(profile),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to update profile:', response.statusText, errorText);
    throw new Error('Failed to update profile');
  }
  
  console.log('Successfully updated profile in Supabase');
};